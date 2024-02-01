import { createAction, createReducer } from "@reduxjs/toolkit";

const addTask = createAction("tasks/add");

const initialState = { allTasks: null };
const tasksReducer = createReducer(initialState, (builder) => {
  builder.addCase(addTask, (state, action) => ({
    ...state,
  }));
});

export default tasksReducer;
