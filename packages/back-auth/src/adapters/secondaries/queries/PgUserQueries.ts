import { fromNullablePromiseCb } from "@paralogs/back-shared";
import { UserUuid } from "@paralogs/shared";
import Knex from "knex";

import { UserQueries } from "../../../domain/reads/gateways/UserQueries";
import { UserPersisted } from "../repositories/postGres/users/UserPersistence";
import { userPersistenceMapper } from "../repositories/postGres/users/userPersistenceMapper";

export const createPgUserQueries = (
  knex: Knex<any, unknown[]>,
): UserQueries => {
  return {
    findByUuid: (uuid: UserUuid) =>
      fromNullablePromiseCb(() =>
        knex.from<UserPersisted>("users").where({ uuid }).first(),
      ).map((userPersisted) => ({
        currentUser: userPersistenceMapper.toDTO(userPersisted),
        token: userPersisted.auth_token,
      })),
  };
};
