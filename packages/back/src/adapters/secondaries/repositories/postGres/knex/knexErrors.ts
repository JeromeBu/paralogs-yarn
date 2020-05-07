import { makeAppErrorCreator } from "../../../../../domain/core/errors";

export const knexError = makeAppErrorCreator({
  code: 5000,
  name: "Knex error",
});
