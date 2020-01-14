import { WingDTO } from "@paralogs/shared";
import { notUnique } from "../core/errors";
import { Result } from "../core/Result";
import { WingEntity } from "../entities/WingEntity";
import { WingRepo } from "../port/WingRepo";
import { WingId } from "../valueObjects/WingId";
import { wingMapper } from "../mappers/wing.mapper";

export const createWingUseCaseCreator = (wingRepo: WingRepo) => {
  return async (wingDto: WingDTO): Promise<Result<WingDTO>> => {
    const wingIdOrError = WingId.create(wingDto.id);
    if (wingIdOrError.error) return Result.fail(wingIdOrError.error);

    const existingWingEntity = await wingRepo.findById(wingIdOrError.getValueOrThrow());
    if (existingWingEntity) return Result.fail(notUnique("Wing"));

    const wingEntityOrError = WingEntity.create(wingDto);
    if (wingEntityOrError.error) return Result.fail(wingEntityOrError.error);
    const wingEntity = wingEntityOrError.getValueOrThrow();

    await wingRepo.save(wingEntity);
    wingMapper.entityToDTO(wingEntity);
    return Result.ok(wingMapper.entityToDTO(wingEntity));
  };
};

export type CreateWingUseCase = ReturnType<typeof createWingUseCaseCreator>;
