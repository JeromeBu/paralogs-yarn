import Knex from "knex";
import { getKnex } from "../db";
import { UserRepo } from "../../../../../domain/port/UserRepo";
import { PgUserRepo } from "./PgUserRepo";
import { makeUserEntityCreator } from "../../../../../domain/testBuilders/userEntityBuilder";
import { TestHashAndTokenManager } from "../../../../secondaries/TestHashAndTokenManager";
import { UserPersistence } from "../../../../../domain/entities/UserEntity";

describe("User repository postgres tests", () => {
  const makeUserEntity = makeUserEntityCreator(new TestHashAndTokenManager());
  let pgUserRepo: UserRepo;
  let knex: Knex;

  beforeAll(async () => {
    knex = getKnex();
    await knex.migrate.down();
    await knex.migrate.up();
  });

  beforeEach(() => {
    knex = getKnex();
    pgUserRepo = new PgUserRepo(knex);
  });

  it("Creates a user", async () => {
    const userEntity = await makeUserEntity({ email: "john@mail.com" });
    const resultSavedUserEntity = await pgUserRepo.create(userEntity);

    const props = userEntity.getProps();
    resultSavedUserEntity.map(savedUserEntity =>
      expect(savedUserEntity).toEqual(userEntity),
    );

    const userPersistenceToMatch: UserPersistence = {
      id: props.id,
      email: props.email.value,
      first_name: props.firstName.value,
      last_name: props.lastName?.value,
      hashed_password: props.hashedPassword,
      auth_token: props.authToken,
    };

    expect(
      await knex<UserPersistence>("users")
        .where({ id: userEntity.id })
        .first(),
    ).toMatchObject(userPersistenceToMatch);
  });

  it("Cannot create a user with the same email", async () => {
    const userEntity = await makeUserEntity({ email: "john@mail.com" });
    const resultSavedUserEntity = await pgUserRepo.create(userEntity);

    expect(resultSavedUserEntity.error).toBe(
      "Email is already taken. Consider logging in.",
    );
  });
});
