import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable("wings", table => {
    // table.increments("pg_id");
    table
      .string("id", 60)
      .primary()
      .unique()
      .notNullable();
    table
      .string("user_id", 100)
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .index();
    table.string("brand", 100).notNullable();
    table.string("model", 100).notNullable();
    table.string("owner_from", 100);
    table.string("owner_until", 100);
    table.integer("flight_time_prior_to_own").notNullable();
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTableIfExists("wings");
}
