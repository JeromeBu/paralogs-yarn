import { CurrentUserWithAuthToken } from "@paralogs/shared";
import { UserEntity } from "../../../domain/entities/UserEntity";
import { userMapper } from "../../../domain/mappers/user.mapper";
import { success } from "../../lib/response-lib";

export const getMeController = async (currentUser: UserEntity) => {
  const currentUserWithToken: CurrentUserWithAuthToken = {
    currentUser: userMapper.entityToDTO(currentUser),
    token: currentUser.getProps().authToken,
  };
  return success(currentUserWithToken);
};
