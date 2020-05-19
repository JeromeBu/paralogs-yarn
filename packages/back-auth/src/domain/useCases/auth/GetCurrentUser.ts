import { notFoundError, ResultAsync } from "@paralogs/back-shared";
import { CurrentUserWithAuthToken, WithUserUuid } from "@paralogs/shared";

import { UserRepo } from "../../gateways/UserRepo";
import { userMapper } from "../../mappers/user.mapper";

interface GetMeDependencies {
  userRepo: UserRepo;
}

export const getCurrentUserUseCaseCreator = ({
  userRepo,
}: GetMeDependencies) => ({
  userUuid,
}: WithUserUuid): ResultAsync<CurrentUserWithAuthToken> => {
  return userRepo
    .findByUuid(userUuid)
    .map((userEntity) => {
      const userDTO = userMapper.entityToDTO(userEntity);
      return {
        currentUser: userDTO,
        token: userEntity.getProps().authToken,
      };
    })
    .toEitherAsync(notFoundError(`No user found with id : ${userUuid}`));
};
