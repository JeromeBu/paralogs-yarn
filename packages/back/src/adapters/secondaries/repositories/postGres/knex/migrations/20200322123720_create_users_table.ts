import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable("users", table => {
    table
      .string("id", 60)
      .unique()
      .primary()
      .notNullable();
    table
      .string("email", 60)
      .unique()
      .notNullable();
    table.string("first_name", 100).notNullable();
    table.string("last_name", 100);
    table.string("hashed_password", 60).notNullable();
    table.string("auth_token", 255);
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTableIfExists("users");
}