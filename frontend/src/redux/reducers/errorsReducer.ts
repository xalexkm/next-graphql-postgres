import { createAction, createReducer } from "@reduxjs/toolkit";
import {
  createTaskAndSync,
  deleteTaskAndSync,
  fetchAllTasksByUserId,
  updateTaskAndSync,
} from "@/src/redux/slices/tasks/tasksThunks";

const addError = createAction<Error>("errors/addError");
const deleteError = createAction<Error>("errors/deleteError");

type ErrorState = {
  errors: Error[];
};
type Error = {
  message: null | string;
};

export const errorsReducer = createReducer(
  { errors: [] } as ErrorState,
  (builder) => {
    builder
      .addCase(fetchAllTasksByUserId.rejected, (state, action) => {
        state.errors.push({ message: "Error fetching tasks" });
      })
      .addCase(addError, (state, action) => {
        state.errors.push({ message: action.payload?.message });
      })
      .addCase(createTaskAndSync.rejected, (state, action) => {
        state.errors.push({ message: "Error syncing the created task" });
      })
      .addCase(updateTaskAndSync.rejected, (state, action) => {
        state.errors.push({ message: "Error syncing the updated task" });
      })
      .addCase(deleteTaskAndSync.rejected, (state, action) => {
        state.errors.push({ message: "Error syncing the deleted task" });
      })
      .addCase(deleteError, (state, action) => {
        state.errors.pop();
      });
  },
);

export { addError, deleteError };
