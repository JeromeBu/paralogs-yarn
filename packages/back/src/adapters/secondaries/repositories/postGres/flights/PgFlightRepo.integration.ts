import { getKnex, resetDb } from "../db";
import { makeUserEntityCreator } from "../../../../../domain/testBuilders/userEntityBuilder";
import { TestHashAndTokenManager } from "../../../../secondaries/TestHashAndTokenManager";
import { UserEntity } from "../../../../../domain/entities/UserEntity";
import { WingRepo } from "../../../../../domain/port/WingRepo";
import { PgFlightRepo } from "./PgFlightRepo";
import { makeWingEntity } from "../../../../../domain/testBuilders/wingEntityBuilder";
import { userPersistenceMapper } from "../users/userPersistenceMapper";
import { FlightRepo } from "../../../../../domain/port/FlightRepo";
import { PgWingRepo } from "../wings/PgWingRepo";
import { makeFlightEntity } from "../../../../../domain/testBuilders/flightEntityBuilder";
import {
  FlightEntity,
  FlightPersistence,
} from "../../../../../domain/entities/FlightEntity";

describe("Flight repository postgres tests", () => {
  const makeUserEntity = makeUserEntityCreator(new TestHashAndTokenManager());
  let pgFlightRepo: FlightRepo;
  let pgWingRepo: WingRepo;
  const knex = getKnex();
  const johnEmail = "johnWing@mail.com";
  let johnEntity: UserEntity;
  let flightEntity: FlightEntity;

  beforeAll(async () => {
    await resetDb(knex);
    johnEntity = await makeUserEntity({ email: johnEmail });
    await knex("users").insert(userPersistenceMapper.toPersistence(johnEntity));
  });

  beforeEach(() => {
    pgFlightRepo = new PgFlightRepo(knex);
    pgWingRepo = new PgWingRepo(knex);
  });

  it("creates a flight", async () => {
    const wingEntity = makeWingEntity({ userId: johnEntity.id });
    await pgWingRepo.create(wingEntity);
    flightEntity = makeFlightEntity({
      userId: johnEntity.id,
      wingId: wingEntity.id,
    });
    await pgFlightRepo.create(flightEntity);
    const { id, userId, wingId, date, duration, time, site } = flightEntity.getProps();

    const flightPersistenceToMatch: FlightPersistence = {
      id,
      user_id: userId,
      wing_id: wingId,
      date,
      duration,
      time: time ?? null,
      site,
    };

    expect(
      await knex<FlightPersistence>("flights")
        .where({ id })
        .first(),
    ).toMatchObject(flightPersistenceToMatch);
  });

  it("gets a flight from it's id", async () => {
    const foundFlight = await pgFlightRepo.findById(flightEntity.id);
    expect(foundFlight).toEqual(flightEntity);
  });

  it("gets all the flights that belong to a user", async () => {
    const foundFlight = await pgFlightRepo.findByUserId(johnEntity.id);
    expect(foundFlight).toEqual([flightEntity]);
  });
});
