import { EnvironmentOption } from "../../../../../config/env";

const knexconfig: { [key in EnvironmentOption]: any } = {
  development: {
    client: "pg",
    // connection: "postgres://username:pgpassword@db:5432/db-name",
    // connection: "postgres://postgres:paralogs-dev-secret@db:5432/paralogs-dev",
    connection: {
      port: 5442,
      database: "paralogs-auth-dev",
      user: "postgres",
      password: "pg-password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
      extension: "ts",
      directory: `${__dirname}/migrations`,
    },
  },
  test: {
    client: "pg",
    connection: {
      port: 5443,
      database: "paralogs-auth-test",
      user: "postgres",
      password: "pg-password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
      extension: "ts",
      directory: `${__dirname}/migrations`,
    },
  },

  // production: {
  //   client: "postgresql",
  //   connection: {
  //     database: "paralogs",
  //     user: "username",
  //     password: "password",
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10,
  //   },
  //   migrations: {
  //     tableName: "knex_migrations",
  //   },
  // },
};

export = knexconfig;
