import { makePilotDTO, makeUserDTO, SignUpParams } from "@paralogs/shared";
import { UserEntity } from "../entities/UserEntity";
import { HashAndTokenManager } from "../gateways/HashAndTokenManager";
import { InMemoryUserRepo } from "../../adapters/secondaries/repositories/inMemory/InMemoryUserRepo";

export const makeUserEntityCreator = (hashAndTokenManager: HashAndTokenManager) => async (
  userParams: Partial<SignUpParams> = {},
): Promise<UserEntity> => {
  const { password = "Bépo1234", email, ...pilotParams } = userParams;
  const userDTO = makeUserDTO({ email });
  const pilotDTO = makePilotDTO(pilotParams);
  return (
    await UserEntity.create(
      { ...userDTO, ...pilotDTO, password },
      { hashAndTokenManager },
    )
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
