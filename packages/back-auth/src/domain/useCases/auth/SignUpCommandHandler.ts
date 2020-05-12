import {
  SignUpParams,
  UuidGenerator,
  CurrentUserWithPilotAndToken,
} from "@paralogs/shared";
import { ResultAsync } from "@paralogs/back-shared";

import { UserRepo } from "../../gateways/UserRepo";
import { UserEntity } from "../../entities/UserEntity";
import { userMapper } from "../../mappers/user.mapper";
import { HashAndTokenManager } from "../../gateways/HashAndTokenManager";

interface SignUpDependencies {
  userRepo: UserRepo;
  uuidGenerator: UuidGenerator;
  hashAndTokenManager: HashAndTokenManager;
}

export const signUpCommandHandlerCreator = ({
  userRepo,
  uuidGenerator,
  hashAndTokenManager,
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
      return {
        token: savedUserEntity.getProps().authToken,
        currentUser: userMapper.entityToDTO(savedUserEntity),
      };
    });
};

export type SignUpCommandHandler = ReturnType<typeof signUpCommandHandlerCreator>;
