import { makeUserDTO, SignUpParams } from "@paralogs/shared";
import { UserEntity } from "../entities/UserEntity";
import { HashAndTokenManager } from "../gateways/HashAndTokenManager";
import { InMemoryUserRepo } from "../../adapters/secondaries/repositories/inMemory/InMemoryUserRepo";

export const makeUserEntityCreator = (hashAndTokenManager: HashAndTokenManager) => async (
  userParams: Partial<SignUpParams & { id: number }> = {},
): Promise<UserEntity> => {
  const { password = "Bépo1234", ...userParamsWithoutPassword } = userParams;
  const userDTO = makeUserDTO(userParamsWithoutPassword);
  return (
    await UserEntity.create({ ...userDTO, password }, { hashAndTokenManager })
      .map(userEntity => {
        if (userParams.id) userEntity.setIdentity(userParams.id);
        return userEntity;
      })
      .run()
  )
    .ifLeft(error => {
      throw error;
    })
    .extract() as UserEntity;
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
  if (!currentUserEntity.hasIdentity()) currentUserEntity.setIdentity(125);
  userRepo.setUsers([currentUserEntity]);
  return currentUserEntity;
};

export type SetupCurrentUser = ReturnType<typeof setupCurrentUserCreator>;
