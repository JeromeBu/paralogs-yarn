import { uuid } from "@paralogs/shared";
import { getKnex, resetDb } from "../db";
import { makeUserEntityCreator } from "../../../../../domain/testBuilders/makeUserEntityCreator";
import { TestHashAndTokenManager } from "../../../../secondaries/TestHashAndTokenManager";
import { UserEntity } from "../../../../../domain/entities/UserEntity";
import { WingRepo } from "../../../../../domain/gateways/WingRepo";
import { PgFlightRepo } from "./PgFlightRepo";
import { makeWingEntity } from "../../../../../domain/testBuilders/makeWingEntity";
import { userPersistenceMapper } from "../users/userPersistenceMapper";
import { FlightRepo } from "../../../../../domain/gateways/FlightRepo";
import { PgWingRepo } from "../wings/PgWingRepo";
import { makeFlightEntity } from "../../../../../domain/testBuilders/makeFlightEntity";
import { FlightEntity } from "../../../../../domain/entities/FlightEntity";
import { FlightPersistence } from "./FlightPersistence";
import { WingPersistence } from "../wings/WingPersistence";
import { flightPersistenceMapper } from "./flightPersistenceMapper";

describe("Flight repository postgres tests", () => {
  const makeUserEntity = makeUserEntityCreator(new TestHashAndTokenManager());
  let pgFlightRepo: FlightRepo;
  let pgWingRepo: WingRepo;
  const knex = getKnex("test");
  const johnEmail = "johnWing@mail.com";
  let johnEntity: UserEntity;
  let flightEntity: FlightEntity;

  beforeEach(async () => {
    await resetDb(knex);
    pgFlightRepo = new PgFlightRepo(knex);
    pgWingRepo = new PgWingRepo(knex);
    johnEntity = await makeUserEntity({ surrogateId: 10, email: johnEmail });
    await knex("users").insert(userPersistenceMapper.toPersistence(johnEntity));

    const koyotWingPersistence: WingPersistence = {
      surrogate_id: 10,
      id: uuid(),
      model: "Koyot 2",
      brand: "Niviuk",
      user_id: johnEntity.id,
      flight_time_prior_to_own: 40,
      owner_from: "2020-01-01",
      owner_until: null,
    };
    await knex<WingPersistence>("wings").insert(koyotWingPersistence);

    const flightPersistence: FlightPersistence = {
      surrogate_id: 5,
      id: uuid(),
      date: "2020-01-10",
      duration: 123,
      site: "La Scia",
      time: "10h55",
      user_id: johnEntity.id,
      wing_id: koyotWingPersistence.id,
    };
    await knex<FlightPersistence>("flights").insert(flightPersistence);
    flightEntity = flightPersistenceMapper.toEntity(flightPersistence);
  });

  it("creates a flight", async () => {
    const wingEntity = makeWingEntity({ userId: johnEntity.id });
    await pgWingRepo.save(wingEntity);
    const createdFlightEntity = makeFlightEntity({
      userId: johnEntity.id,
      wingId: wingEntity.id,
    });
    await pgFlightRepo.save(createdFlightEntity);
    const {
      id,
      userId,
      wingId,
      date,
      duration,
      time,
      site,
    } = createdFlightEntity.getProps();

    const flightPersistenceToMatch: FlightPersistence = {
      surrogate_id: createdFlightEntity.getIdentity(),
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
