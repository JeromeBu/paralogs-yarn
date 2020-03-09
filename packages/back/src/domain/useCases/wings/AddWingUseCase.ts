import { WingDTO, Result } from "@paralogs/shared";
import { notUnique } from "../../core/errors";
import { WingEntity } from "../../entities/WingEntity";
import { WingRepo } from "../../port/WingRepo";
import { wingMapper } from "../../mappers/wing.mapper";

interface AddWingDependencies {
  wingRepo: WingRepo;
}

export const addWingUseCaseCreator = ({ wingRepo }: AddWingDependencies) => {
  return async (wingDto: WingDTO): Promise<Result<WingDTO>> => {
    const existingWingEntity = await wingRepo.findById(wingDto.id);
    if (existingWingEntity) return Result.fail(notUnique("Wing"));

    return WingEntity.create(wingDto).mapAsync(async wingEntity => {
      await wingRepo.create(wingEntity);
      return wingMapper.entityToDTO(wingEntity);
    });
  };
};

export type AddWingUseCase = ReturnType<typeof addWingUseCaseCreator>;
