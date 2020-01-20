import { WingDTO } from "@paralogs/shared";
import { notUnique } from "../../core/errors";
import { Result } from "../../core/Result";
import { WingEntity } from "../../entities/WingEntity";
import { WingRepo } from "../../port/WingRepo";
import { WingId } from "../../valueObjects/WingId";
import { wingMapper } from "../../mappers/wing.mapper";

export const createWingUseCaseCreator = (wingRepo: WingRepo) => {
  return async (wingDto: WingDTO): Promise<Result<WingDTO>> => {
    return WingId.create(wingDto.id).flatMapAsync(async wingId => {
      const existingWingEntity = await wingRepo.findById(wingId);
      if (existingWingEntity) return Result.fail(notUnique("Wing"));

      return WingEntity.create(wingDto).mapAsync(async wingEntity => {
        await wingRepo.save(wingEntity);
        return wingMapper.entityToDTO(wingEntity);
      });
    });
  };
};

export type CreateWingUseCase = ReturnType<typeof createWingUseCaseCreator>;
