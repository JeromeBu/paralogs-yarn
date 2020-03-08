import pg from "pg";
import { ENV } from "../../../../config/env";

export const createPgClient = () => new pg.Pool(ENV.pg);

// // eslint-disable-next-line no-console
// pgClient.query("CREATE TABLE IF NOT EXISTS values (number INT)").catch(console.log);

// pgClient.on("connect", () => {
//   // eslint-disable-next-line no-console
//   console.log("Connected to the PG Database");
// });

// // eslint-disable-next-line no-console
// pgClient.on("error", error => console.log("Lost PG connection : ", error.message));
