import { updateUserUseCaseCreator, UpdateUserUseCase } from "./UpdateUserUseCase";
import { InMemoryUserRepo } from "../../../adapters/secondaries/repositories/inMemory/InMemoryUserRepo";
import { TestHashAndTokenManager } from "../../../adapters/secondaries/TestHashAndTokenManager";
import { setupCurrentUserCreator } from "../../testBuilders/makeUserEntityCreator";
import { HashAndTokenManager } from "../../gateways/HashAndTokenManager";
import { UserEntity } from "../../entities/UserEntity";
import { userMapper } from "../../mappers/user.mapper";

describe("Update user", () => {
  describe("all is good", () => {
    let userRepo: InMemoryUserRepo;
    let hashAndTokenManager: HashAndTokenManager;
    let currentUser: UserEntity;
    let updateUserUseCase: UpdateUserUseCase;

    beforeEach(async () => {
      userRepo = new InMemoryUserRepo();
      hashAndTokenManager = new TestHashAndTokenManager();
      currentUser = await setupCurrentUserCreator({ hashAndTokenManager, userRepo })();
      updateUserUseCase = updateUserUseCaseCreator({ userRepo });
    });

    it("updates user's data", async () => {
      const newFirstName = "Changedfirstname";
      const result = await updateUserUseCase({
        currentUser,
        firstName: newFirstName,
      });
      expect(result.error).toBeUndefined();
      expect(result.isSuccess).toBe(true);

      const { email, uuid, lastName } = currentUser.getProps();

      const updatedCurrentUser = await userRepo.findByUuid(currentUser.uuid);
      expect(userMapper.entityToDTO(updatedCurrentUser!)).toMatchObject({
        user: {
          uuid,
          email: email.value,
        },
        pilot: {
          firstName: newFirstName,
          lastName: lastName?.value,
        },
      });
    });
  });
});
