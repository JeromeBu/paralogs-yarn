import { makeFlightDTO, uuid } from "@paralogs/shared";
import { UserEntity } from "../../entities/UserEntity";
import { setupCurrentUserCreator } from "../../testBuilders/userEntityBuilder";
import { InMemoryUserRepo } from "../../../adapters/secondaries/repositories/inMemory/InMemoryUserRepo";
import { TestHashAndTokenManager } from "../../../adapters/secondaries/TestHashAndTokenManager";
import { HashAndTokenManager } from "../../port/HashAndTokenManager";
import {
  RetrieveFlightsUseCase,
  retreiveFlightsUseCaseCreator,
} from "./RetreiveFlightsUseCase";
import { InMemoryFlightRepo } from "../../../adapters/secondaries/repositories/inMemory/InMemoryFlightRepo";
import { AddFlightUseCase, addFlightUseCaseCreator } from "./AddFlightUseCase";

describe("flights retreival", () => {
  let retreiveFlightUseCase: RetrieveFlightsUseCase;
  let flightRepo: InMemoryFlightRepo;
  let userRepo: InMemoryUserRepo; // cannot use UserRepo because need access .users
  let currentUser: UserEntity;
  let hashAndTokenManager: HashAndTokenManager;

  beforeEach(async () => {
    flightRepo = new InMemoryFlightRepo();
    userRepo = new InMemoryUserRepo();
    hashAndTokenManager = new TestHashAndTokenManager();
    currentUser = await setupCurrentUserCreator({ hashAndTokenManager, userRepo })();
    retreiveFlightUseCase = retreiveFlightsUseCaseCreator({ flightRepo });
  });

  describe("user has no flights", () => {
    it("returns no flights", async () => {
      const flightDTOs = await retreiveFlightUseCase(currentUser);
      expect(flightDTOs).toEqual([]);
    });
  });

  describe("user has some flights", () => {
    let addFlightUseCase: AddFlightUseCase;
    it("retreives only the user's flights", async () => {
      addFlightUseCase = addFlightUseCaseCreator({ flightRepo });
      const flightDTO = makeFlightDTO({ userId: currentUser.id });
      const someoneElseFlightDTO = makeFlightDTO({ userId: uuid() });
      await Promise.all([
        addFlightUseCase(flightDTO),
        addFlightUseCase(someoneElseFlightDTO),
      ]);
      const retreivedFlightDTOs = await retreiveFlightUseCase(currentUser);
      expect(retreivedFlightDTOs).toEqual([flightDTO]);
    });
  });
});
