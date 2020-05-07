import { CurrentUserWithAuthToken, LoginParams } from "@paralogs/shared";
import { Left, Right } from "purify-ts";
import { liftEither, liftPromise } from "purify-ts/EitherAsync";

import { UserRepo } from "../../gateways/UserRepo";
import { Email } from "../../valueObjects/user/Email";
import { HashAndTokenManager } from "../../gateways/HashAndTokenManager";
import { userMapper } from "../../mappers/user.mapper";
import { ResultAsync } from "../../core/Result";
import { AppError, notFoundError, validationError } from "../../core/errors";

interface LoginDependencies {
  userRepo: UserRepo;
  hashAndTokenManager: HashAndTokenManager;
}

export const loginCommandHandlerCreator = ({
  userRepo,
  hashAndTokenManager,
}: LoginDependencies) => (params: LoginParams): ResultAsync<CurrentUserWithAuthToken> => {
  return liftEither(Email.create(params.email)).chain(email => {
    return userRepo
      .findByEmail(email)
      .toEitherAsync(notFoundError("No user found with this email"))
      .chain(userEntity =>
        liftPromise<boolean, AppError>(() =>
          userEntity.checkPassword(params.password, { hashAndTokenManager }),
        ).chain(isPasswordCorrect => {
          if (!isPasswordCorrect)
            return liftEither(Left(validationError("Wrong password")));
          const { user, pilot } = userMapper.entityToDTO(userEntity);
          return liftEither(
            Right({
              token: userEntity.getProps().authToken,
              currentUser: user,
              pilotInformation: pilot,
            }),
          );
        }),
      );
  });
};

export type LoginCommandHandler = ReturnType<typeof loginCommandHandlerCreator>;
