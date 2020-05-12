import { expectRight } from "@paralogs/back-shared";
import { List } from "purify-ts";

import {
  updatePilotCommandHandlerCreator,
  UpdatePilotCommandHandler,
} from "./UpdatePilotCommandHandler";
import { InMemoryPilotRepo } from "../../../adapters/secondaries/repositories/inMemory/InMemoryPilotRepo";
import { setupCurrentPilotCreator } from "../../testBuilders/makePilotEntity";
import { PilotEntity } from "../../entities/PilotEntity";
import { pilotMapper } from "../../mappers/pilotMapper";

describe("Update user", () => {
  describe("all is good", () => {
    let pilotRepo: InMemoryPilotRepo;
    let currentPilot: PilotEntity;
    let updateUserUseCase: UpdatePilotCommandHandler;

    beforeEach(async () => {
      pilotRepo = new InMemoryPilotRepo();
      currentPilot = await setupCurrentPilotCreator({ pilotRepo })();
      updateUserUseCase = updatePilotCommandHandlerCreator({ pilotRepo });
    });

    it("updates user's data", async () => {
      const newFirstName = "Changedfirstname";
      const newLastName = "ChangedLastName";
      const result = await updateUserUseCase({
        pilotUuid: currentPilot.uuid,
        firstName: newFirstName,
        lastName: newLastName,
      }).run();

      expectRight(result);

      const { uuid } = currentPilot;

      const updatedCurrentUser = List.find(
        pilot => pilot.uuid === uuid,
        pilotRepo.pilots,
      );
      updatedCurrentUser.ifNothing(() => {
        expect("no user was found").toBe(false);
      });
      expect(
        pilotMapper.entityToDTO(updatedCurrentUser.extract() as PilotEntity),
      ).toMatchObject({
        uuid,
        firstName: newFirstName,
        lastName: newLastName,
      });
    });
  });
});
