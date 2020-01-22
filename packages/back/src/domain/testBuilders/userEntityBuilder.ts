import { makeUserDTO, SignUpParams } from "@paralogs/shared";
import { UserEntity } from "../entities/UserEntity";
import { HashAndTokenManager } from "../port/HashAndTokenManager";

export const makeUserEntityCreator = (hashAndTokenManager: HashAndTokenManager) => async (
  userParams: Partial<SignUpParams> = {},
): Promise<UserEntity> => {
  const { password = "Secret123", ...userDTOParams } = userParams;
  const userDto = makeUserDTO(userDTOParams);
  return (
    await UserEntity.create({ ...userDto, password }, { hashAndTokenManager })
  ).getOrThrow();
};
