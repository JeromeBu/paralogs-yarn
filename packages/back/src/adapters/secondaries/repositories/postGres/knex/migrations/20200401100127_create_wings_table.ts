import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable("wings", table => {
    table
      .increments("id")
      .primary()
      .notNullable();
    table
      .string("uuid", 60)
      .unique()
      .notNullable();
    table
      .string("user_uuid", 60)
      .notNullable()
      .index();
    // QUESTION : should it reference id in user ? like below :
    // table
    //   .string("user_id", 60)
    //   .notNullable()
    //   .references("id")
    //   .inTable("users")
    //   .onDelete("CASCADE")
    //   .index();
    table
      .integer("user_id")
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
