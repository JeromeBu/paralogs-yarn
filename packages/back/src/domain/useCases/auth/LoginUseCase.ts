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
    const optionUserEntity = await userRepo.findByEmail(correctEmail);

    const optionResultUserEntity = await optionUserEntity.mapAsync(async userEntity => {
      const isPasswordCorrect = await userEntity.checkPassword(password, {
        hashAndTokenManager,
      });
      return isPasswordCorrect
        ? Result.ok<CurrentUserWithAuthToken>({
            token: userEntity.getProps().authToken,
            currentUser: userMapper.entityToDTO(userEntity),
          })
        : Result.fail<CurrentUserWithAuthToken>("Wrong password");
    });

    return optionResultUserEntity.getOrElse(() => Result.fail("No user found"));
  });
};

export type LoginUseCase = ReturnType<typeof loginUseCaseCreator>;
