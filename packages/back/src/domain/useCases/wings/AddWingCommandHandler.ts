import { WingDTO } from "@paralogs/shared";
import { EitherAsync, Left, MaybeAsync, Right } from "purify-ts";
import { liftEither } from "purify-ts/EitherAsync";

import { AppError, notUniqError } from "../../core/errors";
import { WingEntity } from "../../entities/WingEntity";
import { WingRepo } from "../../gateways/WingRepo";
import { ResultAsync } from "../../core/Result";

interface AddWingDependencies {
  wingRepo: WingRepo;
}

const checkNotExists = (
  maybeAsyncValue: MaybeAsync<unknown>,
  error: AppError,
): EitherAsync<AppError, unknown> =>
  EitherAsync(async ({ liftEither: lift }) => {
    const maybe = await maybeAsyncValue.run();
    if (maybe.extract()) return lift(Left(error));
    return lift(Right(null));
  });

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
