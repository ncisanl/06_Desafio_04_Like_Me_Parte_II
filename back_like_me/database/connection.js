import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "1357",
  database: "likeme",
  allowExitOnIdle: true,
});
