import { WingDTO } from "@paralogs/shared";
import { WingRepo } from "../../port/WingRepo";
import { UserId } from "../../valueObjects/user/UserId";
import { Result } from "../../core/Result";
import { wingMapper } from "../../mappers/wing.mapper";

export const listWingsUseCaseCreator = (wingRepo: WingRepo) => async (
  userId: string,
): Promise<Result<WingDTO[]>> => {
  const userIdOrError = UserId.create(userId);
  if (userIdOrError.error) return Result.fail(userIdOrError.error);
  const wingEntities = await wingRepo.findByUserId(userIdOrError.getValueOrThrow());
  return Result.ok(wingEntities.map(wingMapper.entityToDTO));
};

export type ListWingsUseCase = ReturnType<typeof listWingsUseCaseCreator>;
