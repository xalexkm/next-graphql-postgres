import postgres from "postgres";
import {randomUUID} from "crypto";

const sql = postgres("postgres://postgres:password@localhost:5433/postgres");

export const insert_task = async (task) =>
    sql`INSERT INTO public.tasks (task_id, name, estimated_time, estimated_difficulty, user_id) VALUES (${randomUUID()}, ${task.name}, ${task.estimated_time}, ${task.estimated_difficulty}, ${task.user_id})`;

export const findTaskByName = async (userId: string, searchString: string) =>
    sql`SELECT task_id, name, estimated_time, estimated_difficulty, user_id FROM (SELECT task_id, name, estimated_time, estimated_difficulty, user_id FROM tasks WHERE user_id = ${userId}) AS filtered WHERE TRIM(LOWER(filtered.name)) LIKE TRIM(LOWER(${"%" + searchString + "%"}))`;

export const get_task_by_user_id = async (userId: string) =>
    await sql`SELECT * FROM tasks WHERE user_id = ${userId}`;
export const update_task_name = async (
    userId: string,
    taskId: string,
    name: string,
) =>
    await sql`UPDATE tasks SET name = ${name} WHERE task_id = ${taskId} AND user_id = ${userId}`;

export const update_task_estimated_difficulty = async (
    userId: string,
    taskId: string,
    estimated_difficulty: string,
) =>
    await sql`UPDATE tasks SET estimated_difficulty = ${estimated_difficulty} WHERE task_id = ${taskId} AND user_id = ${userId}`;

export const update_task_estimated_time = async (
    userId: string,
    taskId: string,
    estimated_time: number,
) =>
    await sql`UPDATE tasks SET estimated_time = ${estimated_time} WHERE task_id = ${taskId} AND user_id = ${userId}`;

export const update_task = async (
    userId: string,
    taskId: string,
    name: string,
    estimatedDifficulty: number,
    estimatedTime: number,
) =>
    await sql`UPDATE tasks SET name = ${name}, estimated_difficulty = ${estimatedDifficulty}, estimated_time = ${estimatedTime} WHERE task_id = ${taskId} AND user_id = ${userId}`;

export const delete_task = async (userId: string, taskId: string) =>
    await sql`DELETE FROM tasks WHERE task_id = ${taskId} AND user_id = ${userId}`;

export const get_all_tasks = async () => await sql`SELECT * FROM public.tasks`;
