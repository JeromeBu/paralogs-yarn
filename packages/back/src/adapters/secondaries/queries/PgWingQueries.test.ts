import { PilotDTO, SignUpParams, UserDTO } from "@paralogs/shared";
import Knex from "knex";

import { makePilotEntity } from "../../../domain/writes/testBuilders/makePilotEntity";
import { getKnex, resetDb } from "../repositories/postGres/db";
import { PilotPersistence } from "../repositories/postGres/pilots/PilotPersistence";
import { pilotPersistenceMapper } from "../repositories/postGres/pilots/pilotPersistenceMapper";
import { createPgWingQueries } from "./PgWingQueries";

const createAndSavePersistencePilot = async (
  knex: Knex<any, unknown[]>,
  pilotParams: Partial<PilotDTO> & { pilotId?: number } = {},
) => {
  const pilotEntity = await makePilotEntity(pilotParams);
  const pilotPersistence = pilotPersistenceMapper.toPersistence(pilotEntity);
  await knex<PilotPersistence>("pilots")
    .insert(pilotPersistence)
    .returning("id");
  return pilotPersistenceMapper.toDTO(pilotPersistence);
};

export const createAndSavePersistenceUser = async (
  knex: Knex<any, unknown[]>,
  userParams?: Partial<SignUpParams & { id: number }>,
): Promise<UserDTO> => {
  const makeUserEntity = makeUserEntityCreator(new TestHashAndTokenManager());
  const userEntity = await makeUserEntity(userParams);
  const userPersistence = userPersistenceMapper.toPersistence(userEntity);
  const [persistedId] = await knex<UserPersistence>("users")
    .insert(userPersistence)
    .returning("id");
  return userPersistenceMapper.toDTO({ ...userPersistence, id: persistedId });
};

describe("Pg user reads", () => {
  const knex = getKnex("test");
  let pgUserQueries: ReturnType<typeof createPgWingQueries>;

  beforeEach(async () => {
    await resetDb(knex);
    pgUserQueries = createPgWingQueries(knex);
  });

  it("returns empty array when no wing is found", async () => {
    const foundWings = await pgUserQueries.findByPilotUuid("not found id");
    expect(foundWings).toEqual([]);
  });

  it("finds a pilot wings from its uuid", async () => {
    const foundWings = await pgUserQueries.findByPilotUuid(johnDto.uuid).run();
    expect(foundWings.extract()).toEqual(johnDto);
  });
});
