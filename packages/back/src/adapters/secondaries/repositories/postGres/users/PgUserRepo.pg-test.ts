import { UpdatePilotDTO } from "@paralogs/shared";
import { getKnex, resetDb } from "../db";
import { UserRepo } from "../../../../../domain/gateways/UserRepo";
import { PgUserRepo } from "./PgUserRepo";
import { makeUserEntityCreator } from "../../../../../domain/testBuilders/makeUserEntityCreator";
import { TestHashAndTokenManager } from "../../../../secondaries/TestHashAndTokenManager";
import { UserEntity } from "../../../../../domain/entities/UserEntity";
import { Email } from "../../../../../domain/valueObjects/user/Email";
import { PersonName } from "../../../../../domain/valueObjects/user/PersonName";
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
    johnEntity = await makeUserEntity({ surrogateId: 10, email: johnEmail });
    const johnPersistence = userPersistenceMapper.toPersistence(johnEntity);
    await knex<UserPersistence>("users").insert(johnPersistence);
  });

  it("Creates a user", async () => {
    const createdUserEntity = await makeUserEntity({ email: "createduser@mail.com" });
    const resultSavedUserEntity = await pgUserRepo.save(createdUserEntity);

    const props = createdUserEntity.getProps();
    expect(resultSavedUserEntity.error).toBeUndefined();
    expect(resultSavedUserEntity.isSuccess).toBe(true);

    const userPersistenceToMatch: UserPersistence = {
      surrogate_id: createdUserEntity.getIdentity(),
      id: props.id,
      email: props.email.value,
      first_name: props.firstName.value,
      last_name: props.lastName?.value,
      hashed_password: props.hashedPassword,
      auth_token: props.authToken,
    };

    expect(
      await knex<UserPersistence>("users")
        .where({ id: createdUserEntity.id })
        .first(),
    ).toMatchObject(userPersistenceToMatch);
  });

  it("Cannot create a user with the same email", async () => {
    const userEntity = await makeUserEntity({ email: johnEmail });
    const resultSavedUserEntity = await pgUserRepo.save(userEntity);
    await knex.from<UserPersistence>("users");
    expect(resultSavedUserEntity.error).toBe(
      "Email is already taken. Consider logging in.",
    );
  });

  it("finds a user from its email", async () => {
    (await pgUserRepo.findByEmail(Email.create(johnEmail).getOrThrow())).map(userEntity =>
      expect(userEntity).toEqual(johnEntity),
    );
  });

  it("does not find user if it doesn't exist", async () => {
    expect(
      (
        await pgUserRepo.findByEmail(Email.create("notfound@mail.com").getOrThrow())
      ).isNone(),
    ).toBe(true);
  });

  it("finds a user from its id", async () => {
    const userEntity = await pgUserRepo.findById(johnEntity.id);
    expect(userEntity).toEqual(johnEntity);
  });

  it("does not find user if it doesn't exist", async () => {
    expect(await pgUserRepo.findById("not found")).toBeUndefined();
  });

  it("saves modifications on a user", async () => {
    const newParams: UpdatePilotDTO = {
      firstName: "New-FirstName",
      lastName: "New-LastName",
    };
    await johnEntity.update(newParams).map(john => pgUserRepo.save(john));

    const updatedJohn = (await pgUserRepo.findById(johnEntity.id))!;
    expect(updatedJohn.getProps()).toMatchObject({
      ...johnEntity.getProps(),
      firstName: PersonName.create(newParams.firstName).getOrThrow(),
      lastName: PersonName.create(newParams.lastName).getOrThrow(),
    });
  });
});
