import { makePilotDTO, makeUserDTO, SignUpParams } from "@paralogs/shared";
import { UserEntity } from "../entities/UserEntity";
import { HashAndTokenManager } from "../gateways/HashAndTokenManager";
import { InMemoryUserRepo } from "../../adapters/secondaries/repositories/inMemory/InMemoryUserRepo";

export const makeUserEntityCreator = (hashAndTokenManager: HashAndTokenManager) => async (
  userParams: Partial<SignUpParams & { surrogateId: number }> = {},
): Promise<UserEntity> => {
  const { password = "Bépo1234", email, ...pilotParams } = userParams;
  const userDTO = makeUserDTO({ email });
  const pilotDTO = makePilotDTO(pilotParams);
  return (
    await UserEntity.create(
      { ...userDTO, ...pilotDTO, password },
      { hashAndTokenManager },
    )
  )
    .map(userEntity => {
      if (userParams.surrogateId) userEntity.setIdentity(userParams.surrogateId);
      return userEntity;
    })
    .getOrThrow();
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
  if (!currentUserEntity.hasIdentity()) currentUserEntity.setIdentity(1);
  userRepo.setUsers([currentUserEntity]);
  return currentUserEntity;
};

export type SetupCurrentUser = ReturnType<typeof setupCurrentUserCreator>;
