import { createAsyncThunk } from "@reduxjs/toolkit";
import { Task } from "@/src/redux/slices/tasks/tasksActions";
import { loadTasks } from "@/src/redux/slices/tasks/tasksSlice";
import { isBrowser } from "react-device-detect";

export function saveTasksToLocalStorage(tasks: Task[]) {
  if (!isBrowser) return undefined;
  try {
    const serialisedState = JSON.stringify(tasks);
    localStorage.setItem("tasks", serialisedState);
  } catch (e) {
    console.warn(e);
  }
}

export function loadTasksFromLocalStorage() {
  if (!isBrowser) return undefined;
  try {
    const serialisedState = localStorage.getItem("tasks");
    if (serialisedState === null) return undefined;
    return JSON.parse(serialisedState);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
}

const fetchAllTasksByUserId = createAsyncThunk(
  "tasks/fetchAllTasksByUserId",
  async (userId: string, thunkAPI): Promise<Task[]> => {
    let data: Task[] = [];

    try {
      data = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
        }),
      }).then((res) => res.json());
      saveTasksToLocalStorage(data);
    } catch (e: unknown) {
      console.log(e);
      throw thunkAPI.rejectWithValue({
        message: "Could not fetch the tasks",
      });
    }

    return data;
  },
);

const createTaskAndSync = createAsyncThunk(
  "tasks/createTaskAndSync",
  async (task: Task | { user_id: string }, thunkAPI) => {
    const data = await fetch("/api/tasks", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    }).then((res) => res.json());
    return data;
  },
);

const updateTaskAndSync = createAsyncThunk(
  "tasks/updateTaskAndSync",
  async (task: Task | { user_id: string }, thunkAPI) => {
    const data = await fetch("/api/tasks", {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    }).then((res) => res.json());
    return data;
  },
);

const deleteTaskAndSync = createAsyncThunk(
  "tasks/deleteTaskAndSync",
  async (taskId: string, thunkAPI) => {
    const data = await fetch("/api/tasks", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task_id: taskId }),
    }).then((res) => res.json());
    return data;
  },
);

export {
  fetchAllTasksByUserId,
  createTaskAndSync,
  updateTaskAndSync,
  deleteTaskAndSync,
};
