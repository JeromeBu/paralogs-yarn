import { generateUuid, makeFlightDTO } from "@paralogs/shared";

import { InMemoryFlightRepo } from "../../../adapters/secondaries/persistence/inMemory/InMemoryFlightRepo";
import { InMemoryPilotRepo } from "../../../adapters/secondaries/persistence/inMemory/InMemoryPilotRepo";
import {
  AddFlightCommandHandler,
  addFlightCommandHandlerCreator,
} from "../../writes/commandHandlers/flights/AddFlightCommandHandler";
import { PilotEntity } from "../../writes/entities/PilotEntity";
import { setupCurrentPilotCreator } from "../../writes/testBuilders/makePilotEntity";
import {
  RetrieveFlightsUseCase,
  retrieveFlightsUseCaseCreator,
} from "./RetrieveFlightsUseCase";

describe("flights retrieval", () => {
  let retrieveFlightUseCase: RetrieveFlightsUseCase;
  let flightRepo: InMemoryFlightRepo;
  let pilotRepo: InMemoryPilotRepo; // cannot use UserRepo because need access .pilots
  let currentUser: PilotEntity;

  beforeEach(async () => {
    flightRepo = new InMemoryFlightRepo();
    pilotRepo = new InMemoryPilotRepo();
    currentUser = await setupCurrentPilotCreator({ pilotRepo })();
    retrieveFlightUseCase = retrieveFlightsUseCaseCreator({ flightRepo });
  });

  describe("user has no flights", () => {
    it("returns no flights", async () => {
      const flightDTOs = await retrieveFlightUseCase(currentUser.uuid).run();
      expect(flightDTOs.extract()).toEqual([]);
    });
  });

  describe("user has some flights", () => {
    let addFlightUseCase: AddFlightCommandHandler;
    it("retrieves only the user's flights", async () => {
      addFlightUseCase = addFlightCommandHandlerCreator({ flightRepo });
      const flightDTO = makeFlightDTO({ pilotUuid: currentUser.uuid });
      const someoneElseFlightDTO = makeFlightDTO({ pilotUuid: generateUuid() });
      await Promise.all([
        addFlightUseCase(flightDTO).run(),
        addFlightUseCase(someoneElseFlightDTO).run(),
      ]);
      const retrievedFlightDTOs = await retrieveFlightUseCase(
        currentUser.uuid,
      ).run();
      expect(retrievedFlightDTOs.extract()).toEqual([flightDTO]);
    });
  });
});
