import { UpdatePilotDTO } from "@paralogs/shared";
import { liftEither } from "purify-ts/EitherAsync";

import { WithCurrentUser } from "../../entities/UserEntity";
import { UserRepo } from "../../gateways/UserRepo";
import { ResultAsync } from "../../core/purifyAdds";

type UpdateUserUseCaseDependencies = {
  userRepo: UserRepo;
};

type UpdateUserParams = UpdatePilotDTO & WithCurrentUser;

export const updateUserCommandHandlerCreator = ({
  userRepo,
}: UpdateUserUseCaseDependencies) => ({
  currentUser,
  ...paramsToUpdate
}: UpdateUserParams): ResultAsync<void> => {
  return liftEither(currentUser.update(paramsToUpdate)).chain(u => userRepo.save(u));
};

export type UpdateUserCommandHandler = ReturnType<typeof updateUserCommandHandlerCreator>;
