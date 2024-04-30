"use client";
import className from "./tasks.module.scss";
import {useAppDispatch, useAppSelector} from "@/src/redux/hooks";
import {Task} from "@/src/redux/slices/tasks/tasksActions";
import {loadTasks, selectTask} from "@/src/redux/slices/tasks/tasksSlice";
import {Button} from "@/src/app/components/utils/button";
import {useEffect, useRef, useState} from "react";
import {TaskModal} from "@/src/app/components/taskModal/taskModal";
import {isEmpty} from "lodash";
import anime from "animejs/lib/anime.es";
import Cookies from "js-cookie";
import {fetchAllTasksByUserId} from "@/src/redux/slices/tasks/tasksThunks";
import {TASKS_SEARCH_FAIL} from "@/src/app/utils/messages";

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
              }: TaskProps) => {
    return (
        <div onClick={onClick} className={className.task}>
            <span className={className.task__name}>{name}</span>
            <div className={className.task__estimates}>
                <span>Est. Time: {estimated_time}</span>
                <span>Est. Difficulty: {estimated_difficulty}</span>
            </div>
        </div>
    );
};

export const Tasks = () => {
    const dispatch = useAppDispatch();
    const tasks = useAppSelector((state) => state.tasks.allTasks);
    const initialFetch = useAppSelector((state) => state.tasks.initialFetch);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [searchInput, setSearchInput] = useState("");

    const tasksRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        anime({
            targets: tasksRef.current?.childNodes,
            translateX: [50, 0],
            opacity: [0, 1],
            duration: 500,
            easing: "easeInOutExpo",
            delay: anime.stagger(100),
        });
    }, [tasks]);

    useEffect(() => {
        if (searchInput !== "") {
            fetch("/api/tasks/search", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Cookies.get("AuthToken")}`,
                },
                body: JSON.stringify({
                    searchString: searchInput,
                }),
            })
                .then(async (res) => {
                    if (res.status !== 200) throw Error(TASKS_SEARCH_FAIL);
                    const tasks = await res.json();
                    dispatch(loadTasks(tasks));
                })
                .catch(() => {
                    dispatch(fetchAllTasksByUserId());
                });
        } else {
            dispatch(fetchAllTasksByUserId());
        }
    }, [searchInput]);

    return (
        <>
            <article className={className.tasks}>
                {isModalOpen ? <TaskModal setIsOpen={setIsModalOpen}/> : null}
                <Button onClick={() => setIsModalOpen(true)}>Add Task</Button>
                <input
                    className={className.tasks__search__input}
                    type={"text"}
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                />
                {initialFetch ? (
                    <TasksLoading/>
                ) : (
                    <div ref={tasksRef} className={className.tasks__list}>
                        {!isEmpty(tasks) &&
                            tasks.map((task: Task, index) => (
                                <Task
                                    onClick={() => {
                                        setIsModalOpen(true);
                                        dispatch(selectTask(task));
                                    }}
                                    key={index}
                                    {...task}
                                />
                            ))}
                    </div>
                )}
            </article>
        </>
    );
};
