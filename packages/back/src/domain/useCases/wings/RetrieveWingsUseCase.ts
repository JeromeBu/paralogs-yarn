import { PilotUuid, WingDTO } from "@paralogs/shared";
import { Right } from "purify-ts";
import { fromPromise } from "purify-ts/EitherAsync";
import { ResultAsync } from "@paralogs/back-shared";

import { WingRepo } from "../../gateways/WingRepo";
import { wingMapper } from "../../mappers/wing.mapper";

export const retrieveWingsUseCaseCreator = (wingRepo: WingRepo) => (
  currentUserUuid: PilotUuid,
): ResultAsync<WingDTO[]> => {
  return fromPromise(() =>
    wingRepo
      .findByPilotUuid(currentUserUuid)
      .then(wingEntities => Right(wingEntities.map(wingMapper.entityToDTO))),
  );
};

export type RetrieveWingsUseCase = ReturnType<typeof retrieveWingsUseCaseCreator>;
