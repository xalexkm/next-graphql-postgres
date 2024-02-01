import postgres from "postgres";
import { randomUUID } from "crypto";

const sql = postgres("postgres://postgres:password@localhost:5433/postgres");

export const insert_task = async (task) =>
  sql`INSERT INTO public.tasks (task_id, name, estimated_time, estimated_difficulty, user_id) VALUES (${randomUUID()}, ${task.name}, ${task.estimated_time}, ${task.estimated_difficulty}, '871c9c78-6c97-4d61-9459-6a14e1cffe05')`;

export const get_task_by_user_id = async (userId: string) =>
  await sql`SELECT * FROM tasks WHERE user_id = ${userId}`;
export const update_task_name = async (task_id: string, name: string) =>
  await sql`UPDATE tasks SET name = ${name} WHERE task_id = ${task_id}`;

export const update_task_estimated_difficulty = async (
  task_id: string,
  estimated_difficulty: string,
) =>
  await sql`UPDATE tasks SET estimated_difficulty = ${estimated_difficulty} WHERE task_id = ${task_id}`;

export const update_task_estimated_time = async (
  task_id: string,
  estimated_time: number,
) =>
  await sql`UPDATE tasks SET estimated_time = ${estimated_time} WHERE task_id = ${task_id}`;

export const update_task = async (
  task_id: string,
  name: string,
  estimated_difficulty: number,
  estimated_time: number,
) =>
  await sql`UPDATE tasks SET name = ${name}, estimated_difficulty = ${estimated_difficulty}, estimated_time = ${estimated_time} WHERE task_id = ${task_id}`;

export const delete_task = async (taskId: string) =>
  await sql`DELETE FROM tasks WHERE task_id = ${taskId}`;

export const get_all_tasks = async () => await sql`SELECT * FROM public.tasks`;
