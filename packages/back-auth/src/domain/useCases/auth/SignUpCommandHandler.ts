import {
  SignUpParams,
  UuidGenerator,
  CurrentUserWithPilotAndToken,
} from "@paralogs/shared";
import { ResultAsync, EventBus } from "@paralogs/back-shared";

import { UserRepo } from "../../gateways/UserRepo";
import { UserEntity } from "../../entities/UserEntity";
import { userMapper } from "../../mappers/user.mapper";
import { HashAndTokenManager } from "../../gateways/HashAndTokenManager";

interface SignUpDependencies {
  userRepo: UserRepo;
  uuidGenerator: UuidGenerator;
  hashAndTokenManager: HashAndTokenManager;
  eventBus: EventBus;
}

export const signUpCommandHandlerCreator = ({
  userRepo,
  uuidGenerator,
  hashAndTokenManager,
  eventBus,
}: SignUpDependencies) => (
  signUpParams: SignUpParams,
): ResultAsync<CurrentUserWithPilotAndToken> => {
  return UserEntity.create(
    {
      ...signUpParams,
      uuid: uuidGenerator.generate(),
    },
    { hashAndTokenManager },
  )
    .chain(userEntity => userRepo.save(userEntity).map(() => userEntity))
    .map(savedUserEntity => {
      const userDTO = userMapper.entityToDTO(savedUserEntity);
      eventBus.publish("UserSignedUp", userDTO);
      return {
        token: savedUserEntity.getProps().authToken,
        currentUser: userDTO,
      };
    });
};

export type SignUpCommandHandler = ReturnType<typeof signUpCommandHandlerCreator>;
