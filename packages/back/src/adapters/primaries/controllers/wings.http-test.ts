import { AddWingDTO, generateUuid, UpdateWingDTO, wingsRoute } from "@paralogs/shared";
import supertest from "supertest";
import jwt from "jsonwebtoken";
import { RightAsync } from "@paralogs/back-shared";

import { app } from "../express/server";
import { callUseCase } from "../../lib/response-lib";
import { pilotsUseCases } from "../../../config/useCasesChoice";

const request = supertest(app);

describe("Wings routes", () => {
  const pilot = { uuid: generateUuid(), firstName: "John Wing", lastName: "Doe Wing" };
  const token = jwt.sign({ userUuid: pilot.uuid }, "jwtSecretFromEnv");

  beforeAll(async () => {
    await callUseCase({
      useCase: await pilotsUseCases.create,
      eitherAsyncParams: RightAsync(pilot),
    });
  });

  it("adds a wing then retrieves it, then updates", async () => {
    const brand = "Nova";
    const model = "Ion 5";
    const addWingParams: AddWingDTO = {
      uuid: generateUuid(),
      brand,
      model,
      ownerFrom: new Date().toUTCString(),
      flightTimePriorToOwn: 500,
    };

    await request
      .post(wingsRoute)
      .send(addWingParams)
      .set("Authorization", `Bearer ${token}`);

    const retrievedWings = await request
      .get(wingsRoute)
      .set("Authorization", `Bearer ${token}`);

    expect(retrievedWings.body).toMatchObject([
      {
        brand,
        model,
      },
    ]);

    const updateWingParams: UpdateWingDTO = {
      uuid: addWingParams.uuid,
      brand: "New brand",
      model: "New model",
      ownerFrom: new Date("2020-04-20").toUTCString(),
    };

    const updateResponse = await request
      .put(wingsRoute)
      .send(updateWingParams)
      .set("Authorization", `Bearer ${token}`);

    expect(updateResponse.body).toBe("");
    expect(updateResponse.status).toBe(200);

    const updatedWings = await request
      .get(wingsRoute)
      .set("Authorization", `Bearer ${token}`);

    expect(updatedWings.body).toMatchObject([
      {
        ...addWingParams,
        ...updateWingParams,
      },
    ]);
  });
});
