import { createInMemoryEventBus } from "@paralogs/back-shared";
import { generateUuid, PilotDTO, UpdatePilotDTO, usersRoute } from "@paralogs/shared";
import jwt from "jsonwebtoken";
import supertest from "supertest";

import { repositories } from "../../../config/secondaryAdaptersChoice";
import { pilotMapper } from "../../../domain/mappers/pilotMapper";
import { app } from "../express/server";
import { subscribeToUserSignedUp } from "./pilots.subscribers";

const request = supertest(app);

describe("Pilots reaction to events and routes", () => {
  const userDto = {
    uuid: generateUuid(),
    email: "john@mail.com",
    firstName: "John",
    lastName: "Doe",
  };
  let token: string;

  describe("When a UserSignedUp event is dispatched", () => {
    it("creates a pilot with the infos", async () => {
      const getNow = () => new Date("2020-02-02");
      const eventBus = createInMemoryEventBus({ getNow });
      subscribeToUserSignedUp(eventBus);
      eventBus.publish("UserSignedUp", userDto);

      const expectedPilot = {
        uuid: userDto.uuid,
        firstName: userDto.firstName,
        lastName: userDto.lastName,
      };
      setTimeout(async () => {
        await expectPilotStoredToEqual(expectedPilot);
      }, 0);

      token = jwt.sign({ userUuid: userDto.uuid }, "jwtSecretFromEnv");
    });
  });

  describe("update pilot", () => {
    it("updates some pilot's info", async () => {
      const updateUserParams: UpdatePilotDTO = {
        uuid: userDto.uuid,
        firstName: "New-Firstname",
        lastName: "New-Lastname",
      };

      const updateResponse = await request
        .put(usersRoute)
        .send(updateUserParams)
        .set("Authorization", `Bearer ${token}`);

      expect(updateResponse.body).toBe("");
      expect(updateResponse.status).toBe(200);

      await expectPilotStoredToEqual(updateUserParams as PilotDTO);
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
