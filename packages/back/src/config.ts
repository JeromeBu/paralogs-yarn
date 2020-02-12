import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const jwtSecret = process.env.JWT_SECRET ?? "someFakeSecret";

export const config = {
  jwtSecret,
};

// eslint-disable-next-line no-console
console.log(config);
