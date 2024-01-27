import postgres from "postgres";

const sql = postgres("postgres://postgres:password@localhost:5433/postgres");

export const get_all_users = async () => await sql`SELECT * FROM users`;
