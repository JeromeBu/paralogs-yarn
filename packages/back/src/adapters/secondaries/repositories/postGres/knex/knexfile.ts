const knexconfig = {
  development: {
    client: "pg",
    connection: {
      database: "paralogs-dev",
      user: "postgres",
      password: "some_password",
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
      database: "paralogs-test",
      user: "postgres",
      password: "some_password",
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
