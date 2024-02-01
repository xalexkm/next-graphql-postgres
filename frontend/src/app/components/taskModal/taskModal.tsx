import className from "./taskModal.module.scss";
import { useEffect, useState } from "react";
import { DigitSelector } from "@/src/app/components/utils/digitSelector/digitSelector";
import { Button } from "@/src/app/components/utils/button";
import {
  addTask,
  deleteTask,
  deselectTask,
  updateTask,
} from "@/src/redux/slices/tasks/tasksSlice";
import {
  createTaskAndSync,
  deleteTaskAndSync,
  updateTaskAndSync,
} from "@/src/redux/slices/tasks/tasksThunks";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { Task } from "@/src/redux/slices/tasks/tasksActions";

type TaskModal = {
  setIsOpen: (a: boolean) => void;
};

export const TaskModal = ({ setIsOpen }: TaskModal) => {
  const selectedTask: Task | null = useAppSelector(
    (state) => state.tasks.selectedTask,
  );

  const [inputValue, setInputValue] = useState("");
  const dispatch = useAppDispatch();
  const [difficulty, setDifficulty] = useState(
    selectedTask?.estimated_difficulty || 0,
  );
  const [time, setTime] = useState(selectedTask?.estimated_time || 0);

  const closeModal = () => {
    dispatch(deselectTask());
    setIsOpen(false);
  };

  useEffect(() => {
    if (selectedTask) {
      setInputValue(selectedTask.name);
      setDifficulty(selectedTask.estimated_difficulty);
      setTime(selectedTask.estimated_time);
    }
  }, [selectedTask]);

  const dispatchDeleteTask = (taskId: string) => {
    dispatch(deleteTask({ taskId }));
    closeModal();
    dispatch(deleteTaskAndSync(taskId));
  };

  const dispatchUpdateTask = (task: Task) => {
    dispatch(updateTask(task));
    closeModal();
    dispatch(
      updateTaskAndSync({
        user_id: "871c9c78-6c97-4d61-9459-6a14e1cffe05",
        ...task,
      }),
    );
  };

  const dispatchAddTask = (task: Task) => {
    dispatch(addTask(task));
    closeModal();
    dispatch(
      createTaskAndSync({
        user_id: "871c9c78-6c97-4d61-9459-6a14e1cffe05",
        ...task,
      }),
    );
  };

  return (
    <div className={className.task__modal}>
      <div className={className.task__modal__preference__block}>
        <input
          className={className.task__modal__input}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          type="text"
        ></input>
        <div className={className.task__model__parameter}>
          <span>Est. Difficulty</span>
          <DigitSelector digit={difficulty} setDigit={setDifficulty} />
        </div>
        <div className={className.task__model__parameter}>
          <span>Est. Time</span>
          <DigitSelector digit={time} setDigit={setTime} />
        </div>
      </div>
      <div className={className.task__modal__buttons}>
        {selectedTask && selectedTask?.task_id ? (
          <>
            <Button
              onClick={() => dispatchDeleteTask(selectedTask.task_id as string)}
            >
              Delete Task
            </Button>
            <Button
              onClick={() =>
                dispatchUpdateTask({
                  name: inputValue,
                  estimated_difficulty: difficulty,
                  estimated_time: time,
                  task_id: selectedTask.task_id,
                })
              }
            >
              Save Task
            </Button>
          </>
        ) : (
          <Button
            onClick={() =>
              dispatchAddTask({
                name: inputValue,
                estimated_difficulty: difficulty,
                estimated_time: time,
              })
            }
          >
            Create Task
          </Button>
        )}
      </div>
    </div>
  );
};
