import { makeFlightDTO, generateUuid } from "@paralogs/shared";
import { UserEntity } from "../../entities/UserEntity";
import { setupCurrentUserCreator } from "../../testBuilders/makeUserEntityCreator";
import { InMemoryUserRepo } from "../../../adapters/secondaries/repositories/inMemory/InMemoryUserRepo";
import { TestHashAndTokenManager } from "../../../adapters/secondaries/TestHashAndTokenManager";
import { HashAndTokenManager } from "../../gateways/HashAndTokenManager";
import {
  RetrieveFlightsUseCase,
  retrieveFlightsUseCaseCreator,
} from "./RetrieveFlightsUseCase";
import { InMemoryFlightRepo } from "../../../adapters/secondaries/repositories/inMemory/InMemoryFlightRepo";
import {
  AddFlightCommandHandler,
  addFlightCommandHandlerCreator,
} from "./AddFlightCommandHandler";

describe("flights retrieval", () => {
  let retrieveFlightUseCase: RetrieveFlightsUseCase;
  let flightRepo: InMemoryFlightRepo;
  let userRepo: InMemoryUserRepo; // cannot use UserRepo because need access .users
  let currentUser: UserEntity;
  let hashAndTokenManager: HashAndTokenManager;

  beforeEach(async () => {
    flightRepo = new InMemoryFlightRepo();
    userRepo = new InMemoryUserRepo();
    hashAndTokenManager = new TestHashAndTokenManager();
    currentUser = await setupCurrentUserCreator({ hashAndTokenManager, userRepo })();
    retrieveFlightUseCase = retrieveFlightsUseCaseCreator({ flightRepo });
  });

  describe("user has no flights", () => {
    it("returns no flights", async () => {
      const flightDTOs = await retrieveFlightUseCase(currentUser).run();
      expect(flightDTOs.extract()).toEqual([]);
    });
  });

  describe("user has some flights", () => {
    let addFlightUseCase: AddFlightCommandHandler;
    it("retrieves only the user's flights", async () => {
      addFlightUseCase = addFlightCommandHandlerCreator({ flightRepo });
      const flightDTO = makeFlightDTO({ userUuid: currentUser.uuid });
      const someoneElseFlightDTO = makeFlightDTO({ userUuid: generateUuid() });
      await Promise.all([
        addFlightUseCase(flightDTO).run(),
        addFlightUseCase(someoneElseFlightDTO).run(),
      ]);
      const retrievedFlightDTOs = await retrieveFlightUseCase(currentUser).run();
      expect(retrievedFlightDTOs.extract()).toEqual([flightDTO]);
    });
  });
});
