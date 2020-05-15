import { makeAppErrorCreator } from "@paralogs/back-shared";

export const knexError = makeAppErrorCreator({
  code: 500,
  name: "Knex error",
});
