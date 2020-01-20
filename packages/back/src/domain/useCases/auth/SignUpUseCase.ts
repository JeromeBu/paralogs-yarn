import { SignUpParams, UserDTO, UuidGenerator } from "@paralogs/shared";
import { UserRepo } from "../../port/UserRepo";
import { UserEntity } from "../../entities/UserEntity";
import { Result } from "../../core/Result";
import { userMapper } from "../../mappers/user.mapper";

export const signUpUseCaseCreator = (
  userRepo: UserRepo,
  uuidGenerator: UuidGenerator,
) => async (signUpParams: SignUpParams): Promise<Result<UserDTO>> => {
  return UserEntity.create({
    ...signUpParams,
    id: uuidGenerator.generate(),
  }).mapAsync(async userEntity => {
    await userRepo.save(userEntity);
    return userMapper.entityToDTO(userEntity);
  });
};

export type SignUpUseCase = ReturnType<typeof signUpUseCaseCreator>;
