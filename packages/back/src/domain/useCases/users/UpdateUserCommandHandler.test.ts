import {
  updateUserCommandHandlerCreator,
  UpdateUserCommandHandler,
} from "./UpdateUserCommandHandler";
import { InMemoryUserRepo } from "../../../adapters/secondaries/repositories/inMemory/InMemoryUserRepo";
import { TestHashAndTokenManager } from "../../../adapters/secondaries/TestHashAndTokenManager";
import { setupCurrentUserCreator } from "../../testBuilders/makeUserEntityCreator";
import { HashAndTokenManager } from "../../gateways/HashAndTokenManager";
import { UserEntity } from "../../entities/UserEntity";
import { userMapper } from "../../mappers/user.mapper";
import { expectRight } from "../../../utils/testHelpers";

describe("Update user", () => {
  describe("all is good", () => {
    let userRepo: InMemoryUserRepo;
    let hashAndTokenManager: HashAndTokenManager;
    let currentUser: UserEntity;
    let updateUserUseCase: UpdateUserCommandHandler;

    beforeEach(async () => {
      userRepo = new InMemoryUserRepo();
      hashAndTokenManager = new TestHashAndTokenManager();
      currentUser = await setupCurrentUserCreator({ hashAndTokenManager, userRepo })();
      updateUserUseCase = updateUserCommandHandlerCreator({ userRepo });
    });

    it("updates user's data", async () => {
      const newFirstName = "Changedfirstname";
      const result = await updateUserUseCase({
        currentUser,
        firstName: newFirstName,
      }).run();
      expectRight(result);

      const { email, uuid, lastName } = currentUser.getProps();

      const updatedCurrentUser = await userRepo.findByUuid(currentUser.uuid).run();
      updatedCurrentUser.ifNothing(() => {
        expect("no user was found").toBe(false);
      });
      expect(
        userMapper.entityToDTO(updatedCurrentUser.extract() as UserEntity),
      ).toMatchObject({
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
