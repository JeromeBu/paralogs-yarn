import {
  SignUpParams,
  UuidGenerator,
  CurrentUserWithAuthToken,
  Result,
} from "@paralogs/shared";
import { UserRepo } from "../../port/UserRepo";
import { UserEntity } from "../../entities/UserEntity";

import { userMapper } from "../../mappers/user.mapper";
import { HashAndTokenManager } from "../../port/HashAndTokenManager";

interface SignUpDependencies {
  userRepo: UserRepo;
  uuidGenerator: UuidGenerator;
  hashAndTokenManager: HashAndTokenManager;
}

export const signUpUseCaseCreator = ({
  userRepo,
  uuidGenerator,
  hashAndTokenManager,
}: SignUpDependencies) => (
  signUpParams: SignUpParams,
): Promise<Result<CurrentUserWithAuthToken>> => {
  return UserEntity.create(
    {
      ...signUpParams,
      id: uuidGenerator.generate(),
    },
    { hashAndTokenManager },
  )
    .then(userResult =>
      userResult.flatMapAsync(userEntity => userRepo.create(userEntity)),
    )
    .then(savedUserResult =>
      savedUserResult.map(savedUserEntity => ({
        token: savedUserEntity.getProps().authToken,
        currentUser: userMapper.entityToDTO(savedUserEntity),
      })),
    );
};

export type SignUpUseCase = ReturnType<typeof signUpUseCaseCreator>;
