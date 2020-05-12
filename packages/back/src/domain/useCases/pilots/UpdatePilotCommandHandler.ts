import { UpdatePilotDTO, WithPilotUuid } from "@paralogs/shared";
import { liftEither } from "purify-ts/EitherAsync";
import { notFoundError, ResultAsync } from "@paralogs/back-shared";

import { PilotRepo } from "../../gateways/PilotRepo";

type UpdateUserUseCaseDependencies = {
  pilotRepo: PilotRepo;
};

type UpdateUserParams = UpdatePilotDTO & WithPilotUuid;

export const updatePilotCommandHandlerCreator = ({
  pilotRepo,
}: UpdateUserUseCaseDependencies) => ({
  pilotUuid,
  ...paramsToUpdate
}: UpdateUserParams): ResultAsync<void> => {
  return pilotRepo
    .findByUuid(pilotUuid)
    .toEitherAsync(notFoundError(`No pilot found with this id: ${pilotUuid}`))
    .chain(currentPilot => liftEither(currentPilot.update(paramsToUpdate)))
    .chain(pilotToSave => pilotRepo.save(pilotToSave));
};

export type UpdatePilotCommandHandler = ReturnType<
  typeof updatePilotCommandHandlerCreator
>;
