import {createAction, createReducer} from "@reduxjs/toolkit";
import {
    createTaskAndSync,
    deleteTaskAndSync,
    fetchAllTasksByUserId,
    updateTaskAndSync,
} from "@/src/redux/slices/tasks/tasksThunks";
import {
    TASKS_CREATE_SYNC_FAIL,
    TASKS_DELETE_SYNC_FAIL,
    TASKS_FETCH_FAIL,
    TASKS_UPDATE_SYNC_FAIL,
} from "@/src/app/utils/messages";

const addError = createAction<Error>("errors/addError");
const deleteError = createAction<Error>("errors/deleteError");

type ErrorState = {
    errors: Error[];
};
type Error = {
    message: null | string;
};

export const errorsReducer = createReducer(
    {errors: []} as ErrorState,
    (builder) => {
        builder
            .addCase(fetchAllTasksByUserId.rejected, (state, action) => {
                state.errors.push({message: TASKS_FETCH_FAIL});
            })
            .addCase(addError, (state, action) => {
                state.errors.push({message: action.payload?.message});
            })
            .addCase(createTaskAndSync.rejected, (state, action) => {
                state.errors.push({message: TASKS_CREATE_SYNC_FAIL});
            })
            .addCase(updateTaskAndSync.rejected, (state, action) => {
                state.errors.push({message: TASKS_UPDATE_SYNC_FAIL});
            })
            .addCase(deleteTaskAndSync.rejected, (state, action) => {
                state.errors.push({message: TASKS_DELETE_SYNC_FAIL});
            })
            .addCase(deleteError, (state, action) => {
                state.errors.pop();
            });
    },
);

export {addError, deleteError};
