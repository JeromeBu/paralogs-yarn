import { notFoundError, ResultAsync } from "@paralogs/back-shared";
import { UpdateUserDTO } from "@paralogs/shared";
import { liftEither } from "purify-ts/EitherAsync";

import { UserRepo } from "../../gateways/UserRepo";

type UpdateUserDependencies = {
  userRepo: UserRepo;
};

export const updateUserCommandHandlerCreator = ({
  userRepo,
}: UpdateUserDependencies) => (params: UpdateUserDTO): ResultAsync<void> => {
  return userRepo
    .findByUuid(params.uuid)
    .toEitherAsync(notFoundError(`No pilot found with this id: ${params.uuid}`))
    .chain((userEntity) => liftEither(userEntity.update(params)))
    .chain((userToSave) => userRepo.save(userToSave));
};

export type UpdateUserCommandHandler = ReturnType<
  typeof updateUserCommandHandlerCreator
>;
