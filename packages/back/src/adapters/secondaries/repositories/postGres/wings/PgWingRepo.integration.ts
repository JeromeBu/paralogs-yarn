import { getKnex, resetDb } from "../db";
import { makeUserEntityCreator } from "../../../../../domain/testBuilders/userEntityBuilder";
import { TestHashAndTokenManager } from "../../../../secondaries/TestHashAndTokenManager";
import { UserEntity } from "../../../../../domain/entities/UserEntity";
import { WingRepo } from "../../../../../domain/port/WingRepo";
import { PgWingRepo } from "./PgWingRepo";
import { makeWingEntity } from "../../../../../domain/testBuilders/wingEntityBuilder";
import { WingEntity, WingPersistence } from "../../../../../domain/entities/WingEntity";
import { userPersistenceMapper } from "../users/userPersistenceMapper";

describe("Wing repository postgres tests", () => {
  const makeUserEntity = makeUserEntityCreator(new TestHashAndTokenManager());
  let pgWingRepo: WingRepo;
  const knex = getKnex();
  const johnEmail = "johnWing@mail.com";
  let johnEntity: UserEntity;
  let wingEntity: WingEntity;

  beforeAll(async () => {
    await resetDb(knex);
    johnEntity = await makeUserEntity({ email: johnEmail });
    await knex("users").insert(userPersistenceMapper.toPersistence(johnEntity));
  });

  beforeEach(() => {
    pgWingRepo = new PgWingRepo(knex);
  });

  it("creates a wing", async () => {
    wingEntity = makeWingEntity({ userId: johnEntity.id });
    await pgWingRepo.create(wingEntity);
    const {
      id,
      userId,
      brand,
      model,
      flightTimePriorToOwn,
      ownerFrom,
    } = wingEntity.getProps();

    const wingPersistenceToMatch: WingPersistence = {
      id,
      user_id: userId,
      brand,
      model,
      flight_time_prior_to_own: flightTimePriorToOwn,
      owner_from: ownerFrom,
      owner_until: null,
    };

    expect(
      await knex<WingPersistence>("wings")
        .where({ id })
        .first(),
    ).toMatchObject(wingPersistenceToMatch);
  });

  it("gets a wing from it's id", async () => {
    const foundWing = await pgWingRepo.findById(wingEntity.id);
    expect(foundWing).toEqual(wingEntity);
  });

  it("gets all the wings that belong to a user", async () => {
    const foundWing = await pgWingRepo.findByUserId(johnEntity.id);
    expect(foundWing).toEqual([wingEntity]);
  });
});
