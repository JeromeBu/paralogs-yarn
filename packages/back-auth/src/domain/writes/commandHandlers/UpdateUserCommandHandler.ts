import {
  EventBus,
  notFoundError,
  ResultAsync,
  RightAsyncVoid,
} from "@paralogs/back-shared";
import { UpdateUserDTO } from "@paralogs/shared";
import { liftEither } from "purify-ts/EitherAsync";

import { UserRepo } from "../gateways/UserRepo";
import { userMapper } from "../mappers/user.mapper";

type UpdateUserDependencies = {
  userRepo: UserRepo;
  eventBus: EventBus;
};

export const updateUserCommandHandlerCreator = ({
  userRepo,
  eventBus,
}: UpdateUserDependencies) => (params: UpdateUserDTO): ResultAsync<void> => {
  return userRepo
    .findByUuid(params.uuid)
    .toEitherAsync(notFoundError(`No pilot found with this id: ${params.uuid}`))
    .chain((userEntity) => liftEither(userEntity.update(params)))
    .chain((userToSave) =>
      userRepo.save(userToSave).chain(() => {
        eventBus.publish({
          type: "UserUpdated",
          payload: userMapper.entityToDTO(userToSave),
        });
        return RightAsyncVoid();
      }),
    );
};

export type UpdateUserCommandHandler = ReturnType<
  typeof updateUserCommandHandlerCreator
>;
