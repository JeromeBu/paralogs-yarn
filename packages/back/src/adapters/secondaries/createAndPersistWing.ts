import { WingDTO } from "@paralogs/shared";
import Knex from "knex";

import { makeWingEntity } from "../../domain/writes/testBuilders/makeWingEntity";
import { PilotPersisted } from "./repositories/postGres/pilots/PilotPersistence";
import { WingPersistence } from "./repositories/postGres/wings/WingPersistence";
import { wingPersistenceMapper } from "./repositories/postGres/wings/wingPersistenceMapper";

export const createAndPersistWing = async (
  knex: Knex<any, unknown[]>,
  wingParams: Partial<WingDTO> & { wingId?: number } = {},
) => {
  const wingEntity = await makeWingEntity(wingParams);
  const pilot = await knex
    .from<PilotPersisted>("pilots")
    .select("id")
    .where({ uuid: wingEntity.getProps().pilotUuid })
    .first();
  if (!pilot)
    throw new Error(
      "Please provide an existing Pilot, cannot create wing linked to no Pilot",
    );
  const wingPersistence = wingPersistenceMapper.toPersistence(wingEntity);

  await knex<WingPersistence>("wings")
    .insert({ ...wingPersistence, pilot_id: pilot.id })
    .returning("id");
  return wingPersistenceMapper.toDTO(wingPersistence);
};
