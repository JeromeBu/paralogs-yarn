import { UpdateWingDTO, WithUserUuid } from "@paralogs/shared";
import { ResultAsync, notFoundError } from "@paralogs/back-shared";
import { WingRepo } from "../../gateways/WingRepo";

export interface UpdateWingDependencies {
  wingRepo: WingRepo;
}

export const updateWingCommandHandlerCreator = ({ wingRepo }: UpdateWingDependencies) => (
  wingDTO: UpdateWingDTO & WithUserUuid,
): ResultAsync<void> =>
  wingRepo
    .findByUuid(wingDTO.uuid)
    .toEitherAsync(notFoundError("No such wing identity found"))
    .chain(wingEntity => wingRepo.save(wingEntity.update(wingDTO)));

export type UpdateWingCommandHandler = ReturnType<typeof updateWingCommandHandlerCreator>;
