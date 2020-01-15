import { SignUpParams, UserDTO, UuidGenerator } from "@paralogs/shared";
import { UserRepo } from "../../port/UserRepo";
import { UserEntity } from "../../entities/UserEntity";
import { Result } from "../../core/Result";
import { userMapper } from "../../mappers/user.mapper";

export const signUpUseCaseCreator = (
  userRepo: UserRepo,
  uuidGenerator: UuidGenerator,
) => async ({
  email,
  password,
  firstName,
  lastName,
}: SignUpParams): Promise<Result<UserDTO>> => {
  const id = uuidGenerator.generate();
  const userEntityOrError = UserEntity.create({
    id,
    email,
    password,
    firstName,
    lastName,
  });
  if (userEntityOrError.error) return Result.fail(userEntityOrError.error);
  const userEntity = userEntityOrError.getValueOrThrow();

  await userRepo.save(userEntity);

  return Result.ok(userMapper.entityToDTO(userEntity));
};

export type SignUpUseCase = ReturnType<typeof signUpUseCaseCreator>;
