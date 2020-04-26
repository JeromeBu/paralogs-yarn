import { Result, UpdateWingDTO, UserId } from "@paralogs/shared";
import { WingRepo } from "../../gateways/WingRepo";

export interface UpdateWingDependencies {
  wingRepo: WingRepo;
}

export const updateWingUseCaseCreator = ({ wingRepo }: UpdateWingDependencies) => {
  return async (wingDTO: UpdateWingDTO & { userId: UserId }): Promise<Result<void>> => {
    const wingEntity = await wingRepo.findById(wingDTO.id);
    if (!wingEntity) return Result.fail("No such wing identity found");
    return wingRepo
      .save(wingEntity.update(wingDTO))
      .then(Result.ok)
      .catch(e => Result.fail(e.message));
  };
};

export type UpdateWingUseCase = ReturnType<typeof updateWingUseCaseCreator>;
