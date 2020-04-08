import { Environment } from "../../../../../config/env";

const knexconfig: { [key in Environment]: any } = {
  development: {
    client: "pg",
    connection: {
      database: "paralogs-dev",
      user: "postgres",
      password: "paralogs-dev-secret",
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
      port: 5433,
      database: "paralogs-test",
      user: "postgres",
      password: "paralogs-test-secret",
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
