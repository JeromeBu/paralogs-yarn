import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable("flights", table => {
    table
      .increments("surrogate_id")
      .primary()
      .notNullable();
    table
      .string("uuid", 60)
      .unique()
      .notNullable();
    table
      .string("user_uuid", 100)
      .notNullable()
      .references("uuid")
      .inTable("users")
      .onDelete("CASCADE")
      .index();
    table
      .string("wing_uuid", 100)
      .notNullable()
      .references("uuid")
      .inTable("wings")
      .onDelete("CASCADE")
      .index();
    table.string("date", 100).notNullable();
    table.string("time", 100);
    table.string("site", 100).notNullable();
    table.integer("duration", 100).notNullable();
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTableIfExists("flights");
}
