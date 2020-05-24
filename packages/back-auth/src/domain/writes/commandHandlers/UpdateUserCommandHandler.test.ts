import {
  createExpectDispatchedEvent,
  createInMemoryEventBus,
  expectRight,
  InMemoryEventBus,
} from "@paralogs/back-shared";

import { InMemoryUserRepo } from "../../../adapters/secondaries/persistence/inMemory/InMemoryUserRepo";
import { TestHashAndTokenManager } from "../../../adapters/secondaries/TestHashAndTokenManager";
import { UserEntity } from "../entities/UserEntity";
import { HashAndTokenManager } from "../gateways/HashAndTokenManager";
import { userMapper } from "../mappers/user.mapper";
import { setupCurrentUserCreator } from "../testBuilders/makeUserEntityCreator";
import {
  UpdateUserCommandHandler,
  updateUserCommandHandlerCreator,
} from "./UpdateUserCommandHandler";

describe("Update user", () => {
  describe("all is good", () => {
    const now = new Date("2020-02-01");
    let userRepo: InMemoryUserRepo;
    let currentUser: UserEntity;
    let updateUserCommandHandler: UpdateUserCommandHandler;
    let hashAndTokenManager: HashAndTokenManager;
    let eventBus: InMemoryEventBus;
    let expectDispatchedEvent: ReturnType<typeof createExpectDispatchedEvent>;

    beforeEach(async () => {
      userRepo = new InMemoryUserRepo();
      hashAndTokenManager = new TestHashAndTokenManager();
      eventBus = createInMemoryEventBus({
        getNow: () => now,
      });
      expectDispatchedEvent = createExpectDispatchedEvent(eventBus);
      currentUser = await setupCurrentUserCreator({
        userRepo,
        hashAndTokenManager,
      })();
      updateUserCommandHandler = updateUserCommandHandlerCreator({
        userRepo,
        eventBus,
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

      const expectedUserDto = {
        uuid,
        email: currentUser.email.value,
        firstName: newFirstName,
        lastName: newLastName,
      };

      expect(userMapper.entityToDTO(updatedCurrentUser)).toMatchObject(
        expectedUserDto,
      );

      expectDispatchedEvent({
        dateTimeOccurred: now,
        type: "UserUpdated",
        payload: expectedUserDto,
      });
    });
  });
});
