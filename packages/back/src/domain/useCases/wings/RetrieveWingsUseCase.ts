import { Result, WingDTO } from "@paralogs/shared";
import { WingRepo } from "../../port/WingRepo";
import { wingMapper } from "../../mappers/wing.mapper";
import { UserEntity } from "../../entities/UserEntity";

export const retrieveWingsUseCaseCreator = (wingRepo: WingRepo) => async (
  currentUser: UserEntity,
): Promise<Result<WingDTO[]>> => {
  const wingEntities = await wingRepo.findByUserId(currentUser.id);
  return Result.ok(wingEntities.map(wingMapper.entityToDTO));
};

export type RetrieveWingsUseCase = ReturnType<typeof retrieveWingsUseCaseCreator>;