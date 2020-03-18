import { AddWingDTO, SignUpParams, uuid } from "@paralogs/shared";
import supertest from "supertest";
import { app } from "../server";
import { signUpRoute } from "./auth.router";
import { wingsRoute } from "./wing.router";

const request = supertest(app);

describe("Wing routes", () => {
  const email = "john.doe@mail.com";
  const password = "CraZy123";
  const signUpParams: SignUpParams = {
    email,
    firstName: "John",
    lastName: "Doe",
    password,
  };

  it("calls adds a wing then retreives wings", async () => {
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

    const retreivedWings = await request
      .get(wingsRoute)
      .set("Authorization", `Bearer ${token}`);

    expect(retreivedWings.body).toMatchObject([
      {
        brand,
        model,
      },
    ]);
  });
});
