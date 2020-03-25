import dotenv from "dotenv";

dotenv.config({ path: `${__dirname}/../../.env` });

const jwtSecret = process.env.JWT_SECRET ?? "someFakeSecret";

export const ENV = {
  jwtSecret,
};

// eslint-disable-next-line no-console
console.log(ENV);
