import { makeAppErrorCreator } from "@paralogs/back-shared";

export const knexError = makeAppErrorCreator({
  code: 5000,
  name: "Knex error",
});
