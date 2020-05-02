import { Result, UpdateWingDTO, WithUserUuid } from "@paralogs/shared";
import { WingRepo } from "../../gateways/WingRepo";

export interface UpdateWingDependencies {
  wingRepo: WingRepo;
}

export const updateWingCommandHandlerCreator = ({ wingRepo }: UpdateWingDependencies) => {
  return async (wingDTO: UpdateWingDTO & WithUserUuid): Promise<Result<void>> => {
    const wingEntity = await wingRepo.findByUuid(wingDTO.uuid);
    if (!wingEntity) return Result.fail("No such wing identity found");
    return wingRepo.save(wingEntity.update(wingDTO));
  };
};

export type UpdateWingCommandHandler = ReturnType<typeof updateWingCommandHandlerCreator>;
