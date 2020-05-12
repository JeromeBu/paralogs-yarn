import {
  AddWingDTO,
  SignUpParams,
  signUpRoute,
  UpdateWingDTO,
  generateUuid,
  wingsRoute,
} from "@paralogs/shared";
import supertest from "supertest";
import { app } from "../express/server";

const request = supertest(app);

describe("Wings routes", () => {
  const email = "john.doe@mail.com";
  const password = "Bépo1234";
  const signUpParams: SignUpParams = { email, password };

  it("adds a wing then retrieves it, then updates", async () => {
    const {
      body: { token },
      status,
    } = await request.post(signUpRoute).send(signUpParams);
    expect(status).toBe(200);
    expect(token).toBeTruthy();

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
