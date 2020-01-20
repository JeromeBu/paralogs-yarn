import { WingDTO } from "@paralogs/shared";
import { WingRepo } from "../../port/WingRepo";
import { UserId } from "../../valueObjects/user/UserId";
import { Result } from "../../core/Result";
import { wingMapper } from "../../mappers/wing.mapper";

export const listWingsUseCaseCreator = (wingRepo: WingRepo) => async (
  userId: string,
): Promise<Result<WingDTO[]>> => {
  return UserId.create(userId).mapAsync(async validUserId => {
    const wingEntities = await wingRepo.findByUserId(validUserId);
    return wingEntities.map(wingMapper.entityToDTO);
  });
};

export type ListWingsUseCase = ReturnType<typeof listWingsUseCaseCreator>;
