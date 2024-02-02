import { createAsyncThunk } from "@reduxjs/toolkit";
import { Task } from "@/src/redux/slices/tasks/tasksActions";
import { isBrowser } from "react-device-detect";
import Cookies from "js-cookie";
import { isEmpty } from "lodash";

export function saveTasksToLocalStorage(tasks: Task[]) {
  if (!isBrowser) return undefined;
  try {
    const serialisedState = JSON.stringify(tasks);
    localStorage.setItem("tasks", serialisedState);
  } catch (e) {
    console.warn(e);
  }
}

class TaskModel {
  name: string | undefined;
  estimated_time: number | undefined;
  estimated_difficulty: number | undefined;
  task_id?: string | undefined;
  user_id?: string | undefined;

  constructor() {
    this.name = undefined;
    this.estimated_time = undefined;
    this.estimated_difficulty = undefined;
    this.task_id = undefined;
    this.user_id = undefined;
  }
}

export function loadTasksFromLocalStorage() {
  if (!isBrowser) return undefined;
  try {
    const serialisedState = localStorage.getItem("tasks");
    if (serialisedState === null) return undefined;

    const parsed = JSON.parse(serialisedState);

    if (isEmpty(parsed)) throw new Error("No tasks stored in local storage");

    if (parsed[0] instanceof TaskModel) return parsed;
    else {
      localStorage.clear();
      throw new Error(
        "Wrong state structure stored in local storage! Storage cleared!",
      );
    }
  } catch (e) {
    console.warn(e);
    return undefined;
  }
}

const fetchAllTasksByUserId = createAsyncThunk(
  "tasks/fetchAllTasksByUserId",
  async (_, thunkAPI) => {
    let data: Task[] = [];

    try {
      data = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("AuthToken")}`,
        },
      }).then((res) => res.json());
      saveTasksToLocalStorage(data);
    } catch (e: unknown) {
      throw thunkAPI.rejectWithValue({
        message: "Could not fetch the tasks",
      });
    }

    if (data?.[0]?.user_id) {
      return data;
    } else {
      return thunkAPI.rejectWithValue(data);
    }
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
        Authorization: `Bearer ${Cookies.get("AuthToken")}`,
      },
      body: JSON.stringify(task),
    }).then((res) => res.json());

    if (data.user_id) {
      return data;
    } else {
      return thunkAPI.rejectWithValue(data);
    }
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
        Authorization: `Bearer ${Cookies.get("AuthToken")}`,
      },
      body: JSON.stringify(task),
    }).then((res) => res.json());

    if (data.user_id) {
      return data;
    } else {
      return thunkAPI.rejectWithValue(data);
    }
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
        Authorization: `Bearer ${Cookies.get("AuthToken")}`,
      },
      body: JSON.stringify({ task_id: taskId }),
    }).then((res) => res.json());

    if (data.user_id) {
      return data;
    } else {
      return thunkAPI.rejectWithValue(data);
    }
  },
);

export {
  fetchAllTasksByUserId,
  createTaskAndSync,
  updateTaskAndSync,
  deleteTaskAndSync,
};
