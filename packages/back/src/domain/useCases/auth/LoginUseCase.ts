import { LoginParams } from "@paralogs/shared";
import { UserRepo } from "../../port/UserRepo";
import { Result } from "../../core/Result";
import { Email } from "../../valueObjects/user/Email";
import { UserEntity } from "../../entities/UserEntity";

interface LoginDependencies {
  userRepo: UserRepo;
}

export const loginUseCaseCreator = ({ userRepo }: LoginDependencies) => async ({
  email,
  password,
}: LoginParams): Promise<Result<UserEntity>> => {
  return Email.create(email).flatMapAsync(async correctEmail => {
    const currentUserEntity = await userRepo.findByEmail(correctEmail);
    if (!currentUserEntity) return Result.fail("No user found");
    // TODO: FIX THIS => compare with bcrypt
    const isPasswordCorrect = currentUserEntity.getProps().hashedPassword === password;
    return isPasswordCorrect
      ? Result.fail<UserEntity>("Wrong password")
      : Result.fail<UserEntity>("Wrong password");
  });
};

export type LoginUseCase = ReturnType<typeof loginUseCaseCreator>;
