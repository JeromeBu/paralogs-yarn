import { Result, UpdatePilotDTO } from "@paralogs/shared";
import { WithCurrentUser } from "../../entities/UserEntity";
import { UserRepo } from "../../gateways/UserRepo";

type UpdateUserUseCaseDependencies = {
  userRepo: UserRepo;
};

type UpdateUserParams = UpdatePilotDTO & WithCurrentUser;

export const updateUserUseCaseCreator = ({
  userRepo,
}: UpdateUserUseCaseDependencies) => async ({
  currentUser,
  ...paramsToUpdate
}: UpdateUserParams): Promise<Result<void>> => {
  return currentUser.update(paramsToUpdate).flatMapAsync(u => userRepo.save(u));
};

export type UpdateUserUseCase = ReturnType<typeof updateUserUseCaseCreator>;
