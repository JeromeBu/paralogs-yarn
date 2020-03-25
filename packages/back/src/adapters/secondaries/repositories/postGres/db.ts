import Knex from "knex";
import knexconfig from "./knex/knexfile";

type DatabaseEnv = keyof typeof knexconfig;

export const getKnex = (databaseEnv?: DatabaseEnv) =>
  Knex(knexconfig[databaseEnv || "development"]);
