import { SignUpParams, UserDTO } from "@paralogs/shared";
import Knex from "knex";

import { makeUserEntityCreator } from "../../domain/writes/testBuilders/makeUserEntityCreator";
import { UserPersistence } from "./repositories/postGres/users/UserPersistence";
import { userPersistenceMapper } from "./repositories/postGres/users/userPersistenceMapper";
import { TestHashAndTokenManager } from "./TestHashAndTokenManager";

export const createAndSavePersistenceUser = async (
  knex: Knex<any, unknown[]>,
  userParams?: Partial<SignUpParams & { id: number }>,
): Promise<UserDTO> => {
  const makeUserEntity = makeUserEntityCreator(new TestHashAndTokenManager());
  const userEntity = await makeUserEntity(userParams);
  const userPersistence = userPersistenceMapper.toPersistence(userEntity);
  await knex<UserPersistence>("users").insert(userPersistence);
  return userPersistenceMapper.toDTO(userPersistence);
};
