import className from "./tasks.module.scss";
import { useReducer } from "react";

type TasksProps = {};

type TaskProps = {
  name: string;
  estimated_time: number;
  estimated_difficulty: number;
};

const Task = ({ name, estimated_time, estimated_difficulty }: TaskProps) => (
  <div className={className.task}>
    <span className={className.task__name}>{name}</span>
    <div className={className.task__estimates}>
      <span>Est. Time: {estimated_time}</span>
      <span>Est. Difficulty: {estimated_difficulty}</span>
    </div>
  </div>
);

export const Tasks = () => {
  const tasks: any[] = [];
  return (
    <>
      <article className={className.tasks}>
        <input className={className.tasks__input} type="text"></input>
        <div>
          {tasks.map((task, index) => (
            <Task key={index} {...task} />
          ))}
        </div>
      </article>
    </>
  );
};
