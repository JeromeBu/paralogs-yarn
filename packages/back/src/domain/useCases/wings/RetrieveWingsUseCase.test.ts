import { WingDTO, makeWingDTO, generateUuid } from "@paralogs/shared";
import { InMemoryWingRepo } from "../../../adapters/secondaries/repositories/inMemory/InMemoryWingRepo";
import {
  addWingCommandHandlerCreator,
  AddWingCommandHandler,
} from "./AddWingCommandHandler";
import {
  retrieveWingsUseCaseCreator,
  RetrieveWingsUseCase,
} from "./RetrieveWingsUseCase";
import { UserEntity } from "../../entities/UserEntity";
import {
  setupCurrentUserCreator,
  SetupCurrentUser,
} from "../../testBuilders/makeUserEntityCreator";
import { InMemoryUserRepo } from "../../../adapters/secondaries/repositories/inMemory/InMemoryUserRepo";
import { TestHashAndTokenManager } from "../../../adapters/secondaries/TestHashAndTokenManager";
import { HashAndTokenManager } from "../../gateways/HashAndTokenManager";

describe("wings retrieval", () => {
  let retrieveWingsUseCase: RetrieveWingsUseCase;
  let wingRepo: InMemoryWingRepo; // cannot use WingRepo because need access .wings
  let userRepo: InMemoryUserRepo; // cannot use UserRepo because need access .users
  let setupCurrentUser: SetupCurrentUser;
  let currentUser: UserEntity;
  let hashAndTokenManager: HashAndTokenManager;

  beforeEach(async () => {
    wingRepo = new InMemoryWingRepo();
    userRepo = new InMemoryUserRepo();
    hashAndTokenManager = new TestHashAndTokenManager();
    setupCurrentUser = setupCurrentUserCreator({ hashAndTokenManager, userRepo });
    currentUser = await setupCurrentUser();
    retrieveWingsUseCase = retrieveWingsUseCaseCreator(wingRepo);
  });

  describe("user has no wings", () => {
    it("returns no wing", async () => {
      const wings = await retrieveWingsUseCase(currentUser);
      expectWingsDTOResultToEqual(wings.getOrThrow(), []);
    });
  });

  describe("user has some wings", () => {
    let addWingUseCase: AddWingCommandHandler;
    it("retrieves only the user's wings", async () => {
      addWingUseCase = addWingCommandHandlerCreator({ wingRepo });

      const wing1 = (
        await addWing({ model: "Wing 1", userUuid: currentUser.uuid })
      ).getOrThrow();
      const wing2 = (
        await addWing({ model: "Wing 2", userUuid: currentUser.uuid })
      ).getOrThrow();
      await addWing({
        model: "Wing 3",
        userUuid: generateUuid(),
      });

      const retrievedWings = await retrieveWingsUseCase(currentUser);

      expectWingsDTOResultToEqual(retrievedWings.getOrThrow(), [wing2, wing1]);
    });

    const addWing = async (wingParams: Partial<WingDTO>) => {
      return addWingUseCase(makeWingDTO(wingParams));
    };
  });

  const expectWingsDTOResultToEqual = (
    wingsDTO: WingDTO[],
    expectedWingsDTO: WingDTO[],
  ) => {
    expect(wingsDTO).toEqual(expectedWingsDTO);
    expect(wingsDTO[0]).toEqual(expectedWingsDTO[0]);
  };
});
