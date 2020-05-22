import { UserDTO } from "@paralogs/shared";

import { createAndSavePersistenceUser } from "../persistenceTestHelpers";
import { getKnex, resetDb } from "../repositories/postGres/knex/db";
import { createPgUserQueries } from "./PgUserQueries";

describe("Pg user queries", () => {
  const knex = getKnex("test");
  let pgUserQueries: ReturnType<typeof createPgUserQueries>;
  const johnEmail = "john@mail.com";
  let johnDto: UserDTO;

  beforeEach(async () => {
    await resetDb(knex);
    johnDto = await createAndSavePersistenceUser(knex, {
      id: 125,
      email: johnEmail,
    });
    pgUserQueries = createPgUserQueries(knex);
  });

  it("returns maybe none when not found", async () => {
    const foundUser = await pgUserQueries.findByUuid("not found id").run();
    expect(foundUser.extract()).toBeUndefined();
  });

  it("finds a user from its id", async () => {
    const foundUser = await pgUserQueries.findByUuid(johnDto.uuid).run();
    expect(foundUser.extract()).toEqual(johnDto);
  });
});
