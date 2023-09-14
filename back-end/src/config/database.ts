import { createPool, Pool } from "mysql2/promise";

const dbConfig = {
  host: "localhost",
  user: "admin",
  password: "admin",
  database: "kronoosDatabase",
};

export const dbPool: Pool = createPool(dbConfig);
