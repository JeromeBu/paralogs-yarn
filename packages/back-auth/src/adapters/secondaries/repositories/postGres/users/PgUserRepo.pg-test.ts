import { expectEitherToMatchError, expectRight } from "@paralogs/back-shared";

import { UserEntity } from "../../../../../domain/entities/UserEntity";
import { UserRepo } from "../../../../../domain/gateways/UserRepo";
import { makeUserEntityCreator } from "../../../../../domain/testBuilders/makeUserEntityCreator";
import { Email } from "../../../../../domain/valueObjects/user/Email";
import { TestHashAndTokenManager } from "../../../../secondaries/TestHashAndTokenManager";
import { getKnex, resetDb } from "../knex/db";
import { PgUserRepo } from "./PgUserRepo";
import { UserPersisted, UserPersistence } from "./UserPersistence";
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

  it("Creates a user, than an other", async () => {
    const createdUserEntity = await makeUserEntity({
      email: "createduser@mail.com",
    });
    const resultSavedUserEntity = await pgUserRepo
      .save(createdUserEntity)
      .run();

    const props = createdUserEntity.getProps();
    expectRight(resultSavedUserEntity);

    const userPersistenceToMatch: UserPersistence = {
      uuid: props.uuid,
      email: props.email.value,
      hashed_password: props.hashedPassword,
      auth_token: props.authToken,
      first_name: props.firstName.value,
      last_name: props.lastName?.value,
    };

    expect(
      await knex<UserPersisted>("users")
        .where({ uuid: createdUserEntity.uuid })
        .first(),
    ).toMatchObject(userPersistenceToMatch);

    // This second created user is build to check that there is no identity conflict
    const created2ndUserEntity = await makeUserEntity({
      email: "seconduser@mail.com",
    });
    const resultSecondUserEntity = await pgUserRepo
      .save(created2ndUserEntity)
      .run();
    expectRight(resultSecondUserEntity);
  });

  it("Cannot create a user with the same email", async () => {
    const userEntity = await makeUserEntity({ email: johnEmail });
    const resultSavedUserEntity = await pgUserRepo.save(userEntity).run();
    await knex.from<UserPersisted>("users");
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
    expect(
      (await pgUserRepo.findByUuid("not found").run()).isNothing(),
    ).toBeTruthy();
  });
});
