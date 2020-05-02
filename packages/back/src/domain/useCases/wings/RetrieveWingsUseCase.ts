import { Result, WingDTO } from "@paralogs/shared";
import { WingRepo } from "../../gateways/WingRepo";
import { wingMapper } from "../../mappers/wing.mapper";
import { UserEntity } from "../../entities/UserEntity";

export const retrieveWingsUseCaseCreator = (wingRepo: WingRepo) => async (
  currentUser: UserEntity,
): Promise<Result<WingDTO[]>> => {
  const wingEntities = await wingRepo.findByUserUuid(currentUser.uuid);
  return Result.ok(wingEntities.map(wingMapper.entityToDTO));
};

export type RetrieveWingsUseCase = ReturnType<typeof retrieveWingsUseCaseCreator>;
