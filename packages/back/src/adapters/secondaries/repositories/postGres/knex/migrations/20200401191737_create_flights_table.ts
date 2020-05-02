import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable("flights", table => {
    table
      .increments("id")
      .primary()
      .notNullable();
    table
      .string("uuid", 60)
      .unique()
      .notNullable();
    table
      .string("user_uuid", 100)
      .notNullable()
      .index();
    table
      .integer("user_id")
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .index();
    table
      .string("wing_uuid", 100)
      .notNullable()
      .index();
    table
      .integer("wing_id")
      .notNullable()
      .references("id")
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
