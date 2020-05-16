import { notFoundError, ResultAsync } from "@paralogs/back-shared";
import {
  CurrentUserWithPilotWithAuthToken,
  PilotUuid,
  WithUserUuid,
} from "@paralogs/shared";

import { UserRepo } from "../../gateways/UserRepo";
import { userMapper } from "../../mappers/user.mapper";

interface GetMeDependencies {
  userRepo: UserRepo;
}

export const getMeUseCaseCreator = ({ userRepo }: GetMeDependencies) => ({
  userUuid,
}: WithUserUuid): ResultAsync<CurrentUserWithPilotWithAuthToken> => {
  return userRepo
    .findByUuid(userUuid)
    .map((userEntity) => {
      const userDTO = userMapper.entityToDTO(userEntity);
      return {
        currentUser: userDTO,
        pilotInformation: {
          uuid: userDTO.uuid as PilotUuid,
          firstName: userDTO.firstName,
          lastName: userDTO.lastName,
        },
        token: userEntity.getProps().authToken,
      };
    })
    .toEitherAsync(notFoundError(`No user found with id : ${userUuid}`));
};
