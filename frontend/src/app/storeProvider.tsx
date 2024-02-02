"use client";
import { useCallback, useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore, RootState } from "../redux/store";
import {
  fetchAllTasksByUserId,
  loadTasksFromLocalStorage,
} from "@/src/redux/slices/tasks/tasksThunks";
import { isBrowser } from "react-device-detect";
import { loadTasks } from "@/src/redux/slices/tasks/tasksSlice";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();

  useEffect(() => {
    if (storeRef.current) {
      const state = storeRef.current.getState();
      const dispatch = storeRef.current.dispatch;

      if (
        isBrowser &&
        state.tasks.allTasks.length === 0 &&
        !state.tasks.initialFetch
      ) {
        const storedTasks = loadTasksFromLocalStorage();
        if (storedTasks) {
          dispatch(loadTasks(storedTasks));
        }
      } else {
        storeRef.current.dispatch(fetchAllTasksByUserId());
      }
    }
  }, [storeRef?.current?.getState().tasks.allTasks]);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
