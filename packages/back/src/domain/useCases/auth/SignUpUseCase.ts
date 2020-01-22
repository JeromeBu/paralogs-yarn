import { SignUpParams, UserDTO, UuidGenerator } from "@paralogs/shared";
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
): Promise<Result<UserDTO>> => {
  return (
    await UserEntity.create(
      {
        ...signUpParams,
        id: uuidGenerator.generate(),
      },
      { hashAndTokenManager },
    )
  ).mapAsync(async userEntity => {
    await userRepo.save(userEntity);
    return userMapper.entityToDTO(userEntity);
  });
};

export type SignUpUseCase = ReturnType<typeof signUpUseCaseCreator>;
