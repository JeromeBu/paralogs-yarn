import {
  generateUuid,
  getMeRoute,
  PilotDTO,
  UpdatePilotDTO,
  usersRoute,
} from "@paralogs/shared";
import supertest from "supertest";
import { app } from "../express/server";

const request = supertest(app);

describe("Pilots routes", () => {
  const pilotDto: PilotDTO = { uuid: generateUuid(), firstName: "John", lastName: "Doe" };

  it("updates some pilot's info", async () => {
    const {
      body: { token },
    } = await request.post(usersRoute).send(pilotDto);
    expect(token).toBeTruthy();

    const updateUserParams: UpdatePilotDTO = {
      firstName: "New-FirsTname",
      lastName: "New-Lastname",
    };

    const updateResponse = await request
      .put(usersRoute)
      .send(updateUserParams)
      .set("Authorization", `Bearer ${token}`);

    expect(updateResponse.body).toBe("");
    expect(updateResponse.status).toBe(200);

    const me = await request.get(getMeRoute).set("Authorization", `Bearer ${token}`);

    expect(me.body.pilotInformation).toEqual(updateUserParams);
  });
});
