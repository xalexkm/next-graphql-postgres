import postgres from "postgres";

const sql = postgres("postgres://postgres:password@localhost:5433/postgres");

export const insert_task = async () =>
  await sql`INSERT INTO public.tasks (task_id, name, estimated_time, estimated_difficulty, user_id) VALUES 
('9c6f27d5-02e1-4b28-8d88-17f15412126f', 'Task 30', 115, 9, '871c9c78-6c97-4d61-9459-6a14e1cffe05'),
('d26f6e2d-29ef-4c7d-93bb-143795538dd8', 'Task 87', 118, 4, '871c9c78-6c97-4d61-9459-6a14e1cffe05'),
('555c727d-1100-4cd7-8f18-0afa8ab037c5', 'Task 20', 13, 7, '871c9c78-6c97-4d61-9459-6a14e1cffe05')`;

export const get_all_tasks = async () => await sql`SELECT * FROM public.tasks`;
