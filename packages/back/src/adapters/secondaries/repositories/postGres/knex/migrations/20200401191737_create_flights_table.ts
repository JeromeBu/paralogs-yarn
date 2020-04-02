import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable("flights", table => {
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
    table
      .string("wing_id", 100)
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
