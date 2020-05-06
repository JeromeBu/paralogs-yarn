import { UpdateWingDTO, WithUserUuid } from "@paralogs/shared";
import { WingRepo } from "../../gateways/WingRepo";
import { ResultAsync } from "../../core/Result";
import { notFoundError } from "../../core/errors";

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
