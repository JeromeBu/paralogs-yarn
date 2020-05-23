import { ResultAsync } from "@paralogs/back-shared";
import { PilotUuid, WingDTO } from "@paralogs/shared";
import { Right } from "purify-ts";
import { fromPromise } from "purify-ts/EitherAsync";

import { wingMapper } from "../../writes/mappers/wing.mapper";
import { WingQueries } from "../gateways/WingQueries";

export const retrieveWingsUseCaseCreator = (wingQueries: WingQueries) => (
  currentUserUuid: PilotUuid,
): ResultAsync<WingDTO[]> => {
  return fromPromise(() =>
    wingQueries
      .findByPilotUuid(currentUserUuid)
      .then((wingEntities) => Right(wingEntities.map(wingMapper.entityToDTO))),
  );
};

export type RetrieveWingsUseCase = ReturnType<
  typeof retrieveWingsUseCaseCreator
>;
