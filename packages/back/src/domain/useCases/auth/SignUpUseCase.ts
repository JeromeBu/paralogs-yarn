import { SignUpParams, UuidGenerator, CurrentUserWithAuthToken } from "@paralogs/shared";
import { UserRepo } from "../../port/UserRepo";
import { UserEntity } from "../../entities/UserEntity";
import { Result } from "../../core/Result";
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
}: SignUpDependencies) => async (
  signUpParams: SignUpParams,
): Promise<Result<CurrentUserWithAuthToken>> => {
  return (
    await UserEntity.create(
      {
        ...signUpParams,
        id: uuidGenerator.generate(),
      },
      { hashAndTokenManager },
    )
  ).mapAsync(async signedUpUserEntity => {
    await userRepo.save(signedUpUserEntity);
    return {
      token: signedUpUserEntity.getProps().authToken,
      currentUser: userMapper.entityToDTO(signedUpUserEntity),
    };
  });
};

export type SignUpUseCase = ReturnType<typeof signUpUseCaseCreator>;
