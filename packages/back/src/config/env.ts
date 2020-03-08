import dotenv from "dotenv";

dotenv.config({ path: `${__dirname}/../../.env` });

const jwtSecret = process.env.JWT_SECRET ?? "someFakeSecret";

const user = process.env.PG_USER!;
// const host = process.env.PG_HOST!;
const database = process.env.PG_DATABASE!;
const password = process.env.PG_PASSWORD!;
const port = +process.env.PG_PORT!;

export const ENV = {
  jwtSecret,
  pg: {
    user,
    database,
    password,
    port,
  },
};

// eslint-disable-next-line no-console
console.log(ENV);
