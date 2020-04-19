import { Result, UpdateUserDTO } from "@paralogs/shared";
import { WithCurrentUser } from "../../entities/UserEntity";
import { UserRepo } from "../../port/UserRepo";

type UpdateUserUseCaseDependencies = {
  userRepo: UserRepo;
};

type UpdateUserParams = UpdateUserDTO & WithCurrentUser;

export const createUpdateUserUseCase = ({
  userRepo,
}: UpdateUserUseCaseDependencies) => async ({
  currentUser,
  ...paramsToUpdate
}: UpdateUserParams): Promise<Result<void>> => {
  return currentUser.update(paramsToUpdate).flatMapAsync(u => userRepo.save(u));
};

export type UpdateUserUseCase = ReturnType<typeof createUpdateUserUseCase>;
