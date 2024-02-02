import { createSlice } from "@reduxjs/toolkit";
import { Task } from "@/src/redux/slices/tasks/tasksActions";
import {
  createTaskAndSync,
  fetchAllTasksByUserId,
} from "@/src/redux/slices/tasks/tasksThunks";

export interface TasksState {
  allTasks: Task[];
  selectedTask: Task | null;
  initialFetch: boolean;
}

const initialState = {
  allTasks: [],
  selectedTask: null,
  initialFetch: true,
} as TasksState;

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    loadTasks: (state, action: { payload: Task[] }) => {
      state.allTasks = action.payload;
      state.initialFetch = false;
    },
    addTask: (state, action: { payload: Task }) => {
      state.allTasks.push(action.payload);
    },
    selectTask: (state, action: { payload: Task }) => {
      state.selectedTask = action.payload;
    },
    deselectTask: (state) => {
      state.selectedTask = null;
    },
    updateTask: (state, action: { payload: Task }) => {
      state.allTasks = state.allTasks.map((task) => {
        if (task.task_id === action.payload.task_id) {
          return {
            ...task,
            name: action.payload.name ? action.payload.name : task.name,
            estimated_time: action.payload.estimated_time
              ? action.payload.estimated_time
              : task.estimated_time,
            estimated_difficulty: action.payload.estimated_difficulty
              ? action.payload.estimated_difficulty
              : task.estimated_difficulty,
          };
        }
        return task;
      });
    },
    deleteTask: (state, action: { payload: { taskId: string } }) => {
      state.allTasks = state.allTasks.filter(
        (task) => task.task_id !== action.payload.taskId,
      );
    },
  },
  selectors: {
    selectAllTasks: (state) => state.allTasks,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTasksByUserId.fulfilled, (state, action) => {
        state.allTasks = action.payload;
      })
      .addCase(fetchAllTasksByUserId.pending, (state) => {
        state.initialFetch = false;
      });
  },
});

export const {
  loadTasks,
  addTask,
  selectTask,
  updateTask,
  deleteTask,
  deselectTask,
} = tasksSlice.actions;
export const { selectAllTasks } = tasksSlice.selectors;
export default tasksSlice;
