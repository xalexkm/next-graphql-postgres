import postgres from "postgres";

const sql = postgres("postgres://postgres:password@localhost:5433/postgres");

export const get_all_users = async () => await sql`SELECT * FROM users`;

export const get_user_by_email = async (email: string) =>
  await sql`SELECT * FROM users WHERE email = ${email}`;
