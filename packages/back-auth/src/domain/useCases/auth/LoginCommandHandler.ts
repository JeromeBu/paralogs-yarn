import { CurrentUserWithPilotAndToken, LoginParams } from "@paralogs/shared";
import { liftEither, liftPromise } from "purify-ts/EitherAsync";
import {
  AppError,
  LeftAsync,
  notFoundError,
  ResultAsync,
  RightAsync,
  validationError,
} from "@paralogs/back-shared";

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
}: LoginDependencies) => (
  params: LoginParams,
): ResultAsync<CurrentUserWithPilotAndToken> => {
  return liftEither(Email.create(params.email)).chain(email => {
    return userRepo
      .findByEmail(email)
      .toEitherAsync(notFoundError("No user found with this email"))
      .chain(userEntity =>
        liftPromise<boolean, AppError>(() =>
          userEntity.checkPassword(params.password, { hashAndTokenManager }),
        ).chain(isPasswordCorrect => {
          if (!isPasswordCorrect) return LeftAsync(validationError("Wrong password"));
          return RightAsync({
            token: userEntity.getProps().authToken,
            currentUser: userMapper.entityToDTO(userEntity),
          });
        }),
      );
  });
};

export type LoginCommandHandler = ReturnType<typeof loginCommandHandlerCreator>;