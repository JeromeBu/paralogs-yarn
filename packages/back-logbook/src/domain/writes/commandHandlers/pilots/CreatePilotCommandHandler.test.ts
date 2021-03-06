import { expectRight } from "@paralogs/back-shared";
import { generateUuid } from "@paralogs/shared";

import { InMemoryPilotRepo } from "../../../../adapters/secondaries/persistence/inMemory/InMemoryPilotRepo";
import { pilotMapper } from "../../mappers/pilotMapper";
import { createPilotCommandHandlerCreator } from "./CreatePilotCommandHandler";

describe("Create pilot command", () => {
  describe("when all is good", () => {
    it("creates a user", async () => {
      const pilotRepo = new InMemoryPilotRepo();
      const createPilotCommandHandler = createPilotCommandHandlerCreator({
        pilotRepo,
      });
      const pilotDto = {
        uuid: generateUuid(),
        firstName: "John",
        lastName: "Doe",
      };
      const result = await createPilotCommandHandler(pilotDto).run();

      expectRight(result);
      expect(pilotMapper.entityToDTO(pilotRepo.pilots[0])).toEqual(pilotDto);
    });
  });
});
