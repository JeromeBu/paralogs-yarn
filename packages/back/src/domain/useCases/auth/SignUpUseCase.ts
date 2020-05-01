import {
  SignUpParams,
  UuidGenerator,
  CurrentUserWithAuthToken,
  Result,
} from "@paralogs/shared";
import { UserRepo } from "../../gateways/UserRepo";
import { UserEntity } from "../../entities/UserEntity";

import { userMapper } from "../../mappers/user.mapper";
import { HashAndTokenManager } from "../../gateways/HashAndTokenManager";

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
    .then(userResult => {
      return userResult.flatMapAsync(async userEntity => {
        const resultUserSaved = await userRepo.save(userEntity);
        return resultUserSaved.map(() => userEntity);
      });
    })
    .then(savedUserResult =>
      savedUserResult.map(savedUserEntity => {
        const { user, pilot } = userMapper.entityToDTO(savedUserEntity);
        return {
          token: savedUserEntity.getProps().authToken,
          currentUser: user,
          pilotInformation: pilot,
        };
      }),
    );
};

export type SignUpUseCase = ReturnType<typeof signUpUseCaseCreator>;
