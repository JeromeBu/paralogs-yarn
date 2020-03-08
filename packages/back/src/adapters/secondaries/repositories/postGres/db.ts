import pg from "pg";
import { ENV } from "../../../../config/env";

const pgClient = new pg.Pool(ENV.pg);

// eslint-disable-next-line no-console
pgClient.on("error", error => console.log("Lost PG connection : ", error.message));
