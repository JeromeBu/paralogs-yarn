import dotenv from "dotenv";

dotenv.config({ path: `${__dirname}/../../../../.env` });

export type Environment = "development" | "test"; // | "staging" | "production";

const jwtSecret = process.env.JWT_SECRET ?? "someFakeSecret";
const environment: Environment = (process.env.ENVIRONMENT as Environment) ?? "test";

export const ENV = {
  environment,
  jwtSecret,
};

// eslint-disable-next-line no-console
console.log("ENV variables : ", ENV);
