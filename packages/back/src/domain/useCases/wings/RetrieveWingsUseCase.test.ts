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
import { Result } from "../../core/purifyAdds";

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
      const wings = await retrieveWingsUseCase(currentUser).run();
      expectWingsDTOResultToEqual(wings, []);
    });
  });

  describe("user has some wings", () => {
    let addWingUseCase: AddWingCommandHandler;
    it("retrieves only the user's wings", async () => {
      addWingUseCase = addWingCommandHandlerCreator({ wingRepo });

      const wing1 = await addWing({ model: "Wing 1", userUuid: currentUser.uuid }).run();
      const wing2 = await addWing({ model: "Wing 2", userUuid: currentUser.uuid }).run();
      await addWing({
        model: "Wing 3",
        userUuid: generateUuid(),
      });

      const retrievedWings = await retrieveWingsUseCase(currentUser).run();

      expectWingsDTOResultToEqual(retrievedWings, [
        wing2.extract(),
        wing1.extract(),
      ] as WingDTO[]);
    });

    const addWing = (wingParams: Partial<WingDTO>) =>
      addWingUseCase(makeWingDTO(wingParams));
  });

  const expectWingsDTOResultToEqual = (
    wingsDTO: Result<WingDTO[]>,
    expectedWingsDTO: WingDTO[],
  ) => {
    expect(wingsDTO.extract()).toEqual(expectedWingsDTO);
  };
});
