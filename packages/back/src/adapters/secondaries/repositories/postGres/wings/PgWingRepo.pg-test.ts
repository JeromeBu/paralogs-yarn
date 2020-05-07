import { UpdateWingDTO, generateUuid } from "@paralogs/shared";
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
import { expectEitherToMatchError, expectRight } from "../../../../../utils/testHelpers";

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
    johnEntity = await makeUserEntity({ email: johnEmail, id: 125 });

    await knex<UserPersistence>("users").insert(
      userPersistenceMapper.toPersistence(johnEntity),
    );

    const koyotWingPersistence: WingPersistence = {
      id: 200,
      uuid: generateUuid(),
      model: "Koyot 2",
      brand: "Niviuk",
      user_uuid: johnEntity.uuid,
      user_id: johnEntity.getIdentity(),
      flight_time_prior_to_own: 40,
      owner_from: "2020-01-01",
      owner_until: null,
    };

    await knex<WingPersistence>("wings").insert(koyotWingPersistence);
    koyotWingEntity = wingPersistenceMapper.toEntity(koyotWingPersistence);
  });

  it("fails to create a wing when userUuid does not exist", async () => {
    const wingEntity = makeWingEntity({ userUuid: generateUuid() });
    const result = await pgWingRepo.save(wingEntity).run();
    expectEitherToMatchError(result, "No user matched this userUuid");
  });

  it("creates a wing", async () => {
    const wingEntity = makeWingEntity({ userUuid: johnEntity.uuid });
    const result = await pgWingRepo.save(wingEntity).run();
    expectRight(result);
    const {
      uuid,
      userUuid,
      brand,
      model,
      flightTimePriorToOwn,
      ownerFrom,
    } = wingEntity.getProps();

    const wingPersistenceToMatch: WingPersistence = {
      id: 1,
      uuid,
      user_uuid: userUuid,
      brand,
      model,
      flight_time_prior_to_own: flightTimePriorToOwn,
      owner_from: ownerFrom,
      owner_until: null,
    };

    expect(
      await knex<WingPersistence>("wings")
        .where({ uuid })
        .first(),
    ).toMatchObject(wingPersistenceToMatch);
  });

  it("gets a wing from it's id", async () => {
    const foundWing = await pgWingRepo.findByUuid(koyotWingEntity.uuid).run();
    expect(foundWing.extract()).toEqual(koyotWingEntity);
  });

  it("gets all the wings that belong to a user", async () => {
    const foundWing = await pgWingRepo.findByUserUuid(johnEntity.uuid);
    expect(foundWing).toEqual([koyotWingEntity]);
  });

  it("updates the wing", async () => {
    const wingToUpdate = (
      await pgWingRepo.findByUuid(koyotWingEntity.uuid).run()
    ).extract()!;
    const updateParams: UpdateWingDTO = {
      uuid: koyotWingEntity.uuid,
      model: "new model name",
      brand: "new brand",
      flightTimePriorToOwn: 25,
      ownerFrom: "2015",
      ownerUntil: "2030",
    };
    await pgWingRepo.save(wingToUpdate.update(updateParams)).run();
    const updatedWing = (
      await pgWingRepo.findByUuid(koyotWingEntity.uuid).run()
    ).extract()!;
    expect(updatedWing.getProps()).toEqual({
      uuid: koyotWingEntity.uuid,
      userUuid: koyotWingEntity.userUuid,
      model: updateParams.model,
      brand: updateParams.brand,
      flightTimePriorToOwn: updateParams.flightTimePriorToOwn,
      ownerFrom: updateParams.ownerFrom,
      ownerUntil: updateParams.ownerUntil,
    });
  });
});
