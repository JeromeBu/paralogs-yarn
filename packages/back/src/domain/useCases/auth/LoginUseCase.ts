import { LoginParams, CurrentUserWithAuthToken } from "@paralogs/shared";
import { UserRepo } from "../../port/UserRepo";
import { Result } from "../../core/Result";
import { Email } from "../../valueObjects/user/Email";
import { HashAndTokenManager } from "../../port/HashAndTokenManager";
import { userMapper } from "../../mappers/user.mapper";

interface LoginDependencies {
  userRepo: UserRepo;
  hashAndTokenManager: HashAndTokenManager;
}

export const loginUseCaseCreator = ({
  userRepo,
  hashAndTokenManager,
}: LoginDependencies) => async ({
  email,
  password,
}: LoginParams): Promise<Result<CurrentUserWithAuthToken>> => {
  return Email.create(email).flatMapAsync(async correctEmail => {
    const currentUserEntity = await userRepo.findByEmail(correctEmail);
    if (!currentUserEntity) return Result.fail("No user found");

    const isPasswordCorrect = await currentUserEntity.checkPassword(password, {
      hashAndTokenManager,
    });

    return isPasswordCorrect
      ? Result.ok<CurrentUserWithAuthToken>({
          token: currentUserEntity.getProps().authToken,
          currentUser: userMapper.entityToDTO(currentUserEntity),
        })
      : Result.fail<CurrentUserWithAuthToken>("Wrong password");
  });
};

export type LoginUseCase = ReturnType<typeof loginUseCaseCreator>;
