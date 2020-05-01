import { UpdateWingDTO, uuid } from "@paralogs/shared";
import { getKnex, resetDb } from "../db";
import { makeUserEntityCreator } from "../../../../../domain/testBuilders/makeUserEntityCreator";
import { TestHashAndTokenManager } from "../../../../secondaries/TestHashAndTokenManager";
import { UserEntity } from "../../../../../domain/entities/UserEntity";
import { WingRepo } from "../../../../../domain/gateways/WingRepo";
import { PgWingRepo } from "./PgWingRepo";
import { makeWingEntity } from "../../../../../domain/testBuilders/makeWingEntity";
import { WingEntity } from "../../../../../domain/entities/WingEntity";
import { userPersistenceMapper } from "../users/userPersistenceMapper";
import { WingPersistence } from "./WingPersistence";
import { UserPersistence } from "../users/UserPersistence";
import { wingPersistenceMapper } from "./wingPersistenceMapper";

describe("Wing repository postgres tests", () => {
  const makeUserEntity = makeUserEntityCreator(new TestHashAndTokenManager());
  let pgWingRepo: WingRepo;
  const knex = getKnex("test");
  const johnEmail = "johnWing@mail.com";
  let johnEntity: UserEntity;
  let koyotWingEntity: WingEntity;

  beforeEach(async () => {
    await resetDb(knex);
    pgWingRepo = new PgWingRepo(knex);
    johnEntity = await makeUserEntity({ email: johnEmail });

    await knex<UserPersistence>("users").insert(
      userPersistenceMapper.toPersistence(johnEntity),
    );

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
    koyotWingEntity = wingPersistenceMapper.toEntity(koyotWingPersistence);
  });

  it("creates a wing", async () => {
    const wingEntity = makeWingEntity({ userId: johnEntity.id });
    await pgWingRepo.save(wingEntity);
    const {
      id,
      userId,
      brand,
      model,
      flightTimePriorToOwn,
      ownerFrom,
    } = wingEntity.getProps();

    const wingPersistenceToMatch: WingPersistence = {
      surrogate_id: 1,
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
    const foundWing = await pgWingRepo.findById(koyotWingEntity.id);
    expect(foundWing).toEqual(koyotWingEntity);
  });

  it("gets all the wings that belong to a user", async () => {
    const foundWing = await pgWingRepo.findByUserId(johnEntity.id);
    expect(foundWing).toEqual([koyotWingEntity]);
  });

  it("updates the wing", async () => {
    const wingToUpdate = (await pgWingRepo.findById(koyotWingEntity.id))!;
    const updateParams: UpdateWingDTO = {
      id: koyotWingEntity.id,
      model: "new model name",
      brand: "new brand",
      flightTimePriorToOwn: 25,
      ownerFrom: "2015",
      ownerUntil: "2030",
    };
    await pgWingRepo.save(wingToUpdate.update(updateParams));
    const updatedWing = await pgWingRepo.findById(koyotWingEntity.id);
    expect(updatedWing!.getProps()).toEqual({
      id: koyotWingEntity.id,
      userId: koyotWingEntity.userId,
      model: updateParams.model,
      brand: updateParams.brand,
      flightTimePriorToOwn: updateParams.flightTimePriorToOwn,
      ownerFrom: updateParams.ownerFrom,
      ownerUntil: updateParams.ownerUntil,
    });
  });
});
