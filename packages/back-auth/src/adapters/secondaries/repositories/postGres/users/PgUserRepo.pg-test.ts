import { expectEitherToMatchError, expectRight } from "@paralogs/back-shared";
import { getKnex, resetDb } from "../knex/db";

import { UserRepo } from "../../../../../domain/gateways/UserRepo";
import { PgUserRepo } from "./PgUserRepo";
import { makeUserEntityCreator } from "../../../../../domain/testBuilders/makeUserEntityCreator";
import { TestHashAndTokenManager } from "../../../../secondaries/TestHashAndTokenManager";
import { UserEntity } from "../../../../../domain/entities/UserEntity";
import { Email } from "../../../../../domain/valueObjects/user/Email";
import { UserPersistence } from "./UserPersistence";
import { userPersistenceMapper } from "./userPersistenceMapper";

describe("User repository postgres tests", () => {
  const makeUserEntity = makeUserEntityCreator(new TestHashAndTokenManager());
  let pgUserRepo: UserRepo;
  const knex = getKnex("test");
  const johnEmail = "john@mail.com";
  let johnEntity: UserEntity;

  beforeEach(async () => {
    await resetDb(knex);
    pgUserRepo = new PgUserRepo(knex);
    johnEntity = await makeUserEntity({ id: 125, email: johnEmail });
    const johnPersistence = userPersistenceMapper.toPersistence(johnEntity);
    await knex<UserPersistence>("users").insert(johnPersistence);
  });

  it("Creates a user", async () => {
    const createdUserEntity = await makeUserEntity({ email: "createduser@mail.com" });
    const resultSavedUserEntity = await pgUserRepo.save(createdUserEntity).run();

    const props = createdUserEntity.getProps();
    expectRight(resultSavedUserEntity);

    const userPersistenceToMatch: UserPersistence = {
      id: createdUserEntity.getIdentity(),
      uuid: props.uuid,
      email: props.email.value,
      hashed_password: props.hashedPassword,
      auth_token: props.authToken,
      first_name: props.firstName.value,
      last_name: props.lastName?.value,
    };

    expect(
      await knex<UserPersistence>("users")
        .where({ uuid: createdUserEntity.uuid })
        .first(),
    ).toMatchObject(userPersistenceToMatch);
  });

  it("Cannot create a user with the same email", async () => {
    const userEntity = await makeUserEntity({ email: johnEmail });
    const resultSavedUserEntity = await pgUserRepo.save(userEntity).run();
    await knex.from<UserPersistence>("users");
    expectEitherToMatchError(
      resultSavedUserEntity,
      "Email is already taken. Consider logging in.",
    );
  });

  it("finds a user from its email", async () => {
    const email = Email.create(johnEmail)
      .ifLeft(() => expect("Email not created").toBeNull())
      .extract() as Email;
    const userEntity = (await pgUserRepo.findByEmail(email).run()).extract();
    expect(userEntity).toEqual(johnEntity);
  });

  it("does not find user if it doesn't exist", async () => {
    const email = Email.create("notfound@mail.com")
      .ifLeft(() => expect("Email not created").toBeNull())
      .extract() as Email;
    expect((await pgUserRepo.findByEmail(email).run()).isNothing()).toBe(true);
  });

  it("finds a user from its id", async () => {
    const userEntity = await pgUserRepo.findByUuid(johnEntity.uuid).run();
    expect(userEntity.extract()).toEqual(johnEntity);
  });

  it("does not find user if it doesn't exist", async () => {
    expect((await pgUserRepo.findByUuid("not found").run()).isNothing()).toBeTruthy();
  });
});
