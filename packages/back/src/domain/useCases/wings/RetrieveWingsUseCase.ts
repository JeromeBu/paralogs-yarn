import { WingDTO } from "@paralogs/shared";

import { Right } from "purify-ts";
import { fromPromise } from "purify-ts/EitherAsync";
import { WingRepo } from "../../gateways/WingRepo";
import { wingMapper } from "../../mappers/wing.mapper";
import { UserEntity } from "../../entities/UserEntity";
import { ResultAsync } from "../../core/purifyAdds";

export const retrieveWingsUseCaseCreator = (wingRepo: WingRepo) => (
  currentUser: UserEntity,
): ResultAsync<WingDTO[]> => {
  return fromPromise(() =>
    wingRepo
      .findByUserUuid(currentUser.uuid)
      .then(wingEntities => Right(wingEntities.map(wingMapper.entityToDTO))),
  );
};

export type RetrieveWingsUseCase = ReturnType<typeof retrieveWingsUseCaseCreator>;
