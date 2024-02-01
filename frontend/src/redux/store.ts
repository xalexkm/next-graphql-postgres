import { combineSlices, configureStore } from "@reduxjs/toolkit";
import tasksSlice from "@/src/redux/slices/tasks/tasksSlice";
import { errorsReducer } from "@/src/redux/reducers/errorsReducer";

export const rootReducer = combineSlices(tasksSlice, { errors: errorsReducer });

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
