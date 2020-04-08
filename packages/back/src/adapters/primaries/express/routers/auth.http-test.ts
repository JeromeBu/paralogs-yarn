import supertest from "supertest";
import { SignUpParams, LoginParams } from "@paralogs/shared";
import { app } from "../server";
import { signUpRoute, loginRoute } from "./auth.router";

const request = supertest(app);

describe("Authentication routes", () => {
  it("calls sign up than login in", async () => {
    const email = "hey@mail.com";
    const password = "CraZy123";
    const signUpParams: SignUpParams = {
      email,
      firstName: "John",
      lastName: "Doe",
      password,
    };
    const signUpResponse = await request.post(signUpRoute).send(signUpParams);
    expect(signUpResponse.body).toMatchObject({
      currentUser: {
        email,
        firstName: "John",
        lastName: "Doe",
      },
    });

    const loginParams: LoginParams = {
      email,
      password,
    };

    const loginResponse = await request.post(loginRoute).send(loginParams);
    expect(loginResponse.body).toMatchObject({
      currentUser: {
        email,
        firstName: "John",
        lastName: "Doe",
      },
    });
  });
});
