import { Result } from "@paralogs/back-shared";
import { generateUuid, makeWingDTO, WingDTO } from "@paralogs/shared";

import { InMemoryPilotRepo } from "../../../adapters/secondaries/repositories/inMemory/InMemoryPilotRepo";
import { InMemoryWingRepo } from "../../../adapters/secondaries/repositories/inMemory/InMemoryWingRepo";
import {
  AddWingCommandHandler,
  addWingCommandHandlerCreator,
} from "../../writes/commandHandlers/wings/AddWingCommandHandler";
import { PilotEntity } from "../../writes/entities/PilotEntity";
import {
  setupCurrentPilotCreator,
  SetupCurrentUser,
} from "../../writes/testBuilders/makePilotEntity";
import {
  RetrieveWingsUseCase,
  retrieveWingsUseCaseCreator,
} from "./RetrieveWingsUseCase";

describe("wings retrieval", () => {
  let retrieveWingsUseCase: RetrieveWingsUseCase;
  let wingRepo: InMemoryWingRepo; // cannot use WingRepo because need access .wings
  let userRepo: InMemoryPilotRepo; // cannot use UserRepo because need access .pilots
  let setupCurrentUser: SetupCurrentUser;
  let currentUser: PilotEntity;

  beforeEach(async () => {
    wingRepo = new InMemoryWingRepo();
    userRepo = new InMemoryPilotRepo();
    setupCurrentUser = setupCurrentPilotCreator({
      pilotRepo: userRepo,
    });
    currentUser = await setupCurrentUser();
    retrieveWingsUseCase = retrieveWingsUseCaseCreator(wingRepo);
  });

  describe("user has no wings", () => {
    it("returns no wing", async () => {
      const wings = await retrieveWingsUseCase(currentUser.uuid).run();
      expectWingsDTOResultToEqual(wings, []);
    });
  });

  describe("user has some wings", () => {
    let addWingUseCase: AddWingCommandHandler;
    it("retrieves only the user's wings", async () => {
      addWingUseCase = addWingCommandHandlerCreator({ wingRepo });

      const wing1 = await addWing({
        model: "Wing 1",
        pilotUuid: currentUser.uuid,
      }).run();
      const wing2 = await addWing({
        model: "Wing 2",
        pilotUuid: currentUser.uuid,
      }).run();
      await addWing({
        model: "Wing 3",
        pilotUuid: generateUuid(),
      });

      const retrievedWings = await retrieveWingsUseCase(currentUser.uuid).run();

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
