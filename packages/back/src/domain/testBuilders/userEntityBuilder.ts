import { makeUserDTO, SignUpParams } from "@paralogs/shared";
import { UserEntity } from "../entities/UserEntity";
import { HashAndTokenManager } from "../port/HashAndTokenManager";
import { InMemoryUserRepo } from "../../adapters/secondaries/repositories/inMemory/InMemoryUserRepo";

export const makeUserEntityCreator = (hashAndTokenManager: HashAndTokenManager) => async (
  userParams: Partial<SignUpParams> = {},
): Promise<UserEntity> => {
  const { password = "Bépo1234", ...userDTOParams } = userParams;
  const userDto = makeUserDTO(userDTOParams);
  return (
    await UserEntity.create({ ...userDto, password }, { hashAndTokenManager })
  ).getOrThrow();
};

interface SetupCurrentUserDependencies {
  hashAndTokenManager: HashAndTokenManager;
  userRepo: InMemoryUserRepo;
}

export const setupCurrentUserCreator = ({
  hashAndTokenManager,
  userRepo,
}: SetupCurrentUserDependencies) => async (userParams?: Partial<SignUpParams>) => {
  const makeUserEntity = makeUserEntityCreator(hashAndTokenManager);
  const currentUserEntity = await makeUserEntity(userParams);
  userRepo.setUsers([currentUserEntity]);
  return currentUserEntity;
};

export type SetupCurrentUser = ReturnType<typeof setupCurrentUserCreator>;
