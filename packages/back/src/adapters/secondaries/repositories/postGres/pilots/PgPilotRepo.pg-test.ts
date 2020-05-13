import { UpdatePilotDTO } from "@paralogs/shared";
import { liftEither } from "purify-ts/EitherAsync";
import { expectRight, PersonName } from "@paralogs/back-shared";

import { getKnex, resetDb } from "../db";
import { PilotRepo } from "../../../../../domain/gateways/PilotRepo";
import { PgPilotRepo } from "./PgPilotRepo";
import { makePilotEntity } from "../../../../../domain/testBuilders/makePilotEntity";
import { PilotEntity } from "../../../../../domain/entities/PilotEntity";
import { PilotPersistence } from "./PilotPersistence";
import { pilotPersistenceMapper } from "./pilotPersistenceMapper";

describe("Pilot repository postgres tests", () => {
  let pgPilotRepo: PilotRepo;
  const knex = getKnex("test");
  const johnFirstName = "John";
  let johnEntity: PilotEntity;

  beforeEach(async () => {
    await resetDb(knex);
    pgPilotRepo = new PgPilotRepo(knex);
    johnEntity = await makePilotEntity({ pilotId: 125, firstName: johnFirstName });
    const johnPersistence = pilotPersistenceMapper.toPersistence(johnEntity);
    await knex<PilotPersistence>("pilots").insert(johnPersistence);
  });

  it("Creates a pilot", async () => {
    const createdPilotEntity = await makePilotEntity({
      firstName: "My pilot first name",
      lastName: "Pilot last name",
    });
    const resultSavedPilotEntity = await pgPilotRepo.save(createdPilotEntity).run();

    const props = createdPilotEntity.getProps();
    expectRight(resultSavedPilotEntity);

    const pilotPersistenceToMatch: PilotPersistence = {
      id: createdPilotEntity.getIdentity(),
      uuid: props.uuid,
      first_name: props.firstName.value,
      last_name: props.lastName?.value,
    };

    expect(
      await knex<PilotPersistence>("pilots")
        .where({ uuid: createdPilotEntity.uuid })
        .first(),
    ).toMatchObject(pilotPersistenceToMatch);
  });

  it("finds a pilot from its id", async () => {
    const pilotEntity = await pgPilotRepo.findByUuid(johnEntity.uuid).run();
    expect(pilotEntity.extract()).toEqual(johnEntity);
  });

  it("does not find pilot if it doesn't exist", async () => {
    expect((await pgPilotRepo.findByUuid("not found").run()).isNothing()).toBeTruthy();
  });

  it("saves modifications on a pilot", async () => {
    const newParams: UpdatePilotDTO = {
      uuid: johnEntity.uuid,
      firstName: "New-FirstName",
      lastName: "New-LastName",
    };

    await liftEither(johnEntity.update(newParams))
      .chain(john => pgPilotRepo.save(john))
      .run();

    const updatedJohn = (await pgPilotRepo.findByUuid(johnEntity.uuid).run()).extract()!;
    expect(updatedJohn.getProps()).toMatchObject({
      ...johnEntity.getProps(),
      firstName: PersonName.create(newParams.firstName).extract(),
      lastName: PersonName.create(newParams.lastName).extract(),
    });
  });
});
