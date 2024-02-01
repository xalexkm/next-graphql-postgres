"use client";
import className from "./tasks.module.scss";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { Task } from "@/src/redux/slices/tasks/tasksActions";
import { loadTasks, selectTask } from "@/src/redux/slices/tasks/tasksSlice";
import { Button } from "@/src/app/components/utils/button";
import { memo, useState } from "react";
import { TaskModal } from "@/src/app/components/taskModal/taskModal";
import { loadTasksFromLocalStorage } from "@/src/redux/slices/tasks/tasksThunks";
import { isBrowser } from "react-device-detect";
import { addError } from "@/src/redux/reducers/errorsReducer";

type TaskProps = Task & { onClick?: () => void };

const TasksLoading = () => (
  <div
    className={`${className.tasks__loading} ${className.loading__gradient}`}
  ></div>
);

const Task = ({
  onClick,
  name,
  estimated_time,
  estimated_difficulty,
}: TaskProps) => (
  <div onClick={onClick} className={className.task}>
    <span className={className.task__name}>{name}</span>
    <div className={className.task__estimates}>
      <span>Est. Time: {estimated_time}</span>
      <span>Est. Difficulty: {estimated_difficulty}</span>
    </div>
  </div>
);

export const Tasks = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.tasks.allTasks);
  const initialFetch = useAppSelector((state) => state.tasks.initialFetch);
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <article className={className.tasks}>
        {isModalOpen ? <TaskModal setIsOpen={setIsModalOpen} /> : null}
        <Button onClick={() => setIsModalOpen(true)}>Add Task</Button>
        <Button onClick={() => dispatch(addError({ message: "New Message" }))}>
          Add Message
        </Button>
        <div className={className.tasks__list}>
          {initialFetch ? (
            <TasksLoading />
          ) : (
            tasks.map((task: Task, index) => (
              <Task
                onClick={() => {
                  setIsModalOpen(true);
                  dispatch(selectTask(task));
                }}
                key={index}
                {...task}
              />
            ))
          )}
        </div>
      </article>
    </>
  );
};
