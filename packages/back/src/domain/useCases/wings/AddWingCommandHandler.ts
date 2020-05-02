import { WingDTO, Result } from "@paralogs/shared";
import { notUnique } from "../../core/errors";
import { WingEntity } from "../../entities/WingEntity";
import { WingRepo } from "../../gateways/WingRepo";
import { wingMapper } from "../../mappers/wing.mapper";

interface AddWingDependencies {
  wingRepo: WingRepo;
}

export const addWingCommandHandlerCreator = ({ wingRepo }: AddWingDependencies) => {
  return async (wingDto: WingDTO): Promise<Result<WingDTO>> => {
    const existingWingEntity = await wingRepo.findByUuid(wingDto.uuid);
    if (existingWingEntity) return Result.fail(notUnique("Wing"));

    return WingEntity.create(wingDto).mapAsync(async wingEntity => {
      await wingRepo.save(wingEntity);
      return wingMapper.entityToDTO(wingEntity);
    });
  };
};

export type AddWingCommandHandler = ReturnType<typeof addWingCommandHandlerCreator>;
