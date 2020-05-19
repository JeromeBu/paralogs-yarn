import { expectRight } from "@paralogs/back-shared";

import { InMemoryUserRepo } from "../../../adapters/secondaries/repositories/inMemory/InMemoryUserRepo";
import { TestHashAndTokenManager } from "../../../adapters/secondaries/TestHashAndTokenManager";
import { UserEntity } from "../../entities/UserEntity";
import { HashAndTokenManager } from "../../gateways/HashAndTokenManager";
import { userMapper } from "../../mappers/user.mapper";
import { setupCurrentUserCreator } from "../../testBuilders/makeUserEntityCreator";
import {
  UpdateUserCommandHandler,
  updateUserCommandHandlerCreator,
} from "./UpdateUserCommandHandler";

describe("Update user", () => {
  describe("all is good", () => {
    let userRepo: InMemoryUserRepo;
    let currentUser: UserEntity;
    let updateUserCommandHandler: UpdateUserCommandHandler;
    let hashAndTokenManager: HashAndTokenManager;

    beforeEach(async () => {
      userRepo = new InMemoryUserRepo();
      hashAndTokenManager = new TestHashAndTokenManager();
      currentUser = await setupCurrentUserCreator({
        userRepo,
        hashAndTokenManager,
      })();
      updateUserCommandHandler = updateUserCommandHandlerCreator({
        userRepo,
      });
    });

    it("updates user's data", async () => {
      const newFirstName = "Changedfirstname";
      const newLastName = "ChangedLastName";
      const result = await updateUserCommandHandler({
        uuid: currentUser.uuid,
        firstName: newFirstName,
        lastName: newLastName,
      }).run();

      expectRight(result);

      const { uuid } = currentUser;

      const updatedCurrentUser = userRepo.users.find(
        (user) => user.uuid === uuid,
      )!;

      expect(updatedCurrentUser).toBeTruthy();

      expect(userMapper.entityToDTO(updatedCurrentUser)).toMatchObject({
        uuid,
        firstName: newFirstName,
        lastName: newLastName,
      });
    });
  });
});
