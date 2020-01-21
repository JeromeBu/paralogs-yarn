import { SignUpParams, UserDTO, UuidGenerator } from "@paralogs/shared";
import { UserRepo } from "../../port/UserRepo";
import { UserEntity } from "../../entities/UserEntity";
import { Result } from "../../core/Result";
import { userMapper } from "../../mappers/user.mapper";
import { HashGenerator } from "../../port/HashGenerator";
import { TokenManager } from "../../port/TokenManager";

interface SignUpDependencies {
  userRepo: UserRepo;
  uuidGenerator: UuidGenerator;
  hashGenerator: HashGenerator;
  tokenManager: TokenManager;
}

export const signUpUseCaseCreator = ({
  userRepo,
  uuidGenerator,
  hashGenerator,
  tokenManager,
}: SignUpDependencies) => async (
  signUpParams: SignUpParams,
): Promise<Result<UserDTO>> => {
  return (
    await UserEntity.create(
      {
        ...signUpParams,
        id: uuidGenerator.generate(),
      },
      { hashGenerator, tokenManager },
    )
  ).mapAsync(async userEntity => {
    await userRepo.save(userEntity);
    return userMapper.entityToDTO(userEntity);
  });
};

export type SignUpUseCase = ReturnType<typeof signUpUseCaseCreator>;
