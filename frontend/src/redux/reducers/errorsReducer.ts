import { createAction, createReducer } from "@reduxjs/toolkit";
import { fetchAllTasksByUserId } from "@/src/redux/slices/tasks/tasksThunks";

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
        state.errors.push({ message: "Error fetching tasks by user_id" });
      })
      .addCase(addError, (state, action) => {
        state.errors.push({ message: action.payload?.message });
      })
      .addCase(deleteError, (state, action) => {
        state.errors.pop();
      });
  },
);

export { addError, deleteError };
