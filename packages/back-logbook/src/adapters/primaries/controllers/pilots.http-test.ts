import { createInMemoryEventBus } from "@paralogs/back-shared";
import { generateUuid, PilotDTO } from "@paralogs/shared";

import { repositories } from "../../../config/secondaryAdaptersChoice";
import { pilotMapper } from "../../../domain/writes/mappers/pilotMapper";
import { subscribeToEvents } from "./pilots.subscribers";

describe("Pilots reaction to events and routes", () => {
  const userDto = {
    uuid: generateUuid(),
    email: "john@mail.com",
    firstName: "John",
    lastName: "Doe",
  };

  describe("When a UserSignedUp event is dispatched", () => {
    it("creates a pilot with the infos", async () => {
      const getNow = () => new Date("2020-02-02");
      const eventBus = createInMemoryEventBus({ getNow });
      await subscribeToEvents(eventBus);
      eventBus.publish({ type: "UserSignedUp", payload: userDto });

      const expectedPilot = {
        uuid: userDto.uuid,
        firstName: userDto.firstName,
        lastName: userDto.lastName,
      };
      setTimeout(async () => {
        await expectPilotStoredToEqual(expectedPilot);
      }, 0);
    });
  });

  const expectPilotStoredToEqual = async (expectedPilot: PilotDTO) => {
    const pilotEntity = (
      await repositories.pilot.findByUuid(userDto.uuid).run()
    ).extract();
    expect(pilotEntity).toBeTruthy();
    const createdPilot = pilotMapper.entityToDTO(pilotEntity!);
    expect(createdPilot).toEqual(expectedPilot);
  };
});
