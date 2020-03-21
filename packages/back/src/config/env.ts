import dotenv from "dotenv";

dotenv.config({ path: `${__dirname}/../../.env` });

const jwtSecret = process.env.JWT_SECRET ?? "someFakeSecret";

const user = process.env.POSTGRES_USER!;
const database = process.env.POSTGRES_DB!;
const password = process.env.POSTGRES_PASSWORD!;

export const ENV = {
  jwtSecret,
  pg: {
    user,
    database,
    password,
  },
};

// eslint-disable-next-line no-console
console.log(ENV);
