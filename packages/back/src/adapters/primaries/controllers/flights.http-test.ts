import {
  AddFlightDTO,
  AddWingDTO,
  flightsRoute,
  generateUuid,
  wingsRoute,
  WingUuid,
} from "@paralogs/shared";
import supertest from "supertest";
import { RightAsync } from "@paralogs/back-shared";
import jwt from "jsonwebtoken";

import { app } from "../express/server";
import { callUseCase } from "../../lib/response-lib";
import { pilotsUseCases } from "../../../config/useCasesChoice";

const request = supertest(app);

describe("Flights routes", () => {
  const pilot = { uuid: generateUuid(), firstName: "John Wing", lastName: "Doe Wing" };
  const token = jwt.sign({ userUuid: pilot.uuid }, "jwtSecretFromEnv");

  beforeAll(async () => {
    await callUseCase({
      useCase: await pilotsUseCases.create,
      eitherAsyncParams: RightAsync(pilot),
    });
  });

  const brand = "Nova";
  const model = "Ion 5";
  const wingUuid: WingUuid = generateUuid();
  const addWingParams: AddWingDTO = {
    uuid: wingUuid,
    brand,
    model,
    ownerFrom: new Date("2020-03-03").toUTCString(),
    flightTimePriorToOwn: 500,
  };

  it("adds a flight then retrieves it", async () => {
    await request
      .post(wingsRoute)
      .send(addWingParams)
      .set("Authorization", `Bearer ${token}`);

    const addFlightParams: AddFlightDTO = {
      uuid: generateUuid(),
      date: new Date("2020-04-04").toUTCString(),
      duration: 35,
      site: "La scia",
      time: "15h35",
      wingUuid,
    };

    await request
      .post(flightsRoute)
      .send(addFlightParams)
      .set("Authorization", `Bearer ${token}`);

    const retrievedFlights = await request
      .get(flightsRoute)
      .set("Authorization", `Bearer ${token}`);

    expect(retrievedFlights.body).toMatchObject([addFlightParams]);
  });
});
