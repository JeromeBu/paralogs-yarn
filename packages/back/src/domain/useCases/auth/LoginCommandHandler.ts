import { LoginParams, CurrentUserWithAuthToken, Result } from "@paralogs/shared";
import { UserRepo } from "../../gateways/UserRepo";

import { Email } from "../../valueObjects/user/Email";
import { HashAndTokenManager } from "../../gateways/HashAndTokenManager";
import { userMapper } from "../../mappers/user.mapper";

interface LoginDependencies {
  userRepo: UserRepo;
  hashAndTokenManager: HashAndTokenManager;
}

export const loginCommandHandlerCreator = ({
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
      if (!isPasswordCorrect)
        return Result.fail<CurrentUserWithAuthToken>("Wrong password");
      const { user, pilot } = userMapper.entityToDTO(userEntity);
      return Result.ok<CurrentUserWithAuthToken>({
        token: userEntity.getProps().authToken,
        currentUser: user,
        pilotInformation: pilot,
      });
    });

    return optionResultUserEntity.getOrElse(() => Result.fail("No user found"));
  });
};

export type LoginCommandHandler = ReturnType<typeof loginCommandHandlerCreator>;
