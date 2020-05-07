import { WingDTO } from "@paralogs/shared";
import { liftEither } from "purify-ts/EitherAsync";

import { notUniqError } from "../../core/errors";
import { WingEntity } from "../../entities/WingEntity";
import { WingRepo } from "../../gateways/WingRepo";
import { ResultAsync } from "../../core/Result";
import { checkNotExists } from "../../core/EitherFunctions";

interface AddWingDependencies {
  wingRepo: WingRepo;
}

export const addWingCommandHandlerCreator = ({ wingRepo }: AddWingDependencies) => (
  wingDTO: WingDTO,
): ResultAsync<WingDTO> => {
  const maybeAsyncWingDto = wingRepo.findByUuid(wingDTO.uuid);

  const eitherAsyncNotExists = checkNotExists(
    maybeAsyncWingDto,
    notUniqError("Cannot create wing. A wing with this uuid already exists"),
  );

  return eitherAsyncNotExists
    .chain(() => liftEither(WingEntity.create(wingDTO)))
    .chain(wingEntity => wingRepo.save(wingEntity).map(() => wingDTO));
};

export type AddWingCommandHandler = ReturnType<typeof addWingCommandHandlerCreator>;
