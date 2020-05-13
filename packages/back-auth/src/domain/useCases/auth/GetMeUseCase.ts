import { notFoundError } from "@paralogs/back-shared";
import { WithUserUuid } from "@paralogs/shared";

import { UserRepo } from "../../gateways/UserRepo";
import { userMapper } from "../../mappers/user.mapper";

interface GetMeDependencies {
  userRepo: UserRepo;
}

export const getMeUseCaseCreator = ({ userRepo }: GetMeDependencies) => ({
  userUuid,
}: WithUserUuid) => {
  return userRepo
    .findByUuid(userUuid)
    .map(userMapper.entityToDTO)
    .toEitherAsync(notFoundError(`No user found with id : ${userUuid}`));
};
