import { CurrentUserWithAuthToken } from "@paralogs/shared";
import { UserEntity } from "../../../domain/entities/UserEntity";
import { userMapper } from "../../../domain/mappers/user.mapper";
import { success, failure } from "../../lib/response-lib";

export const getMeController = async (currentUser: UserEntity) => {
  try {
    const currentUserWithToken: CurrentUserWithAuthToken = {
      currentUser: userMapper.entityToDTO(currentUser),
      token: currentUser.getProps().authToken,
    };
    return success(currentUserWithToken);
  } catch (error) {
    return failure(error.message ?? error, error.statusCode);
  }
};
