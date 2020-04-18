import { AddWingDTO, SignUpParams, uuid } from "@paralogs/shared";
import supertest from "supertest";
import { app } from "../express/server";
import { signUpRoute } from "./auth.controller";
import { wingsRoute } from "./wings.controller";

const request = supertest(app);

describe("Wings routes", () => {
  const email = "john.doe@mail.com";
  const password = "Bépo1234";
  const signUpParams: SignUpParams = {
    email,
    firstName: "John",
    lastName: "Doe",
    password,
  };

  it("adds a wing then retrieves wings", async () => {
    const {
      body: { token },
    } = await request.post(signUpRoute).send(signUpParams);

    const brand = "Nova";
    const model = "Ion 5";
    const addWingParams: AddWingDTO = {
      id: uuid(),
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
  });
});
