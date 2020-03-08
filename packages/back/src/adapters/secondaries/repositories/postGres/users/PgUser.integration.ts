import { createPgClient } from "../db";
import { UserRepo } from "../../../../../domain/port/UserRepo";
import { PgUserRepo } from "./PgUserRepo";
import { makeUserEntityCreator } from "../../../../../domain/testBuilders/userEntityBuilder";
import { TestHashAndTokenManager } from "../../../../secondaries/TestHashAndTokenManager";

describe("User repository postgres tests", () => {
  describe("...", () => {
    const pgClient = createPgClient();
    const makeUserEntity = makeUserEntityCreator(new TestHashAndTokenManager());
    let pgUserRepo: UserRepo;
    it("Creates a user", async () => {
      pgUserRepo = new PgUserRepo(pgClient);
      await pgUserRepo.save(await makeUserEntity());
    });
  });
});
