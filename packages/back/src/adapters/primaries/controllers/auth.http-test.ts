import supertest from "supertest";
import {
  SignUpParams,
  LoginParams,
  signUpRoute,
  loginRoute,
  getMeRoute,
} from "@paralogs/shared";
import { app } from "../express/server";

const request = supertest(app);

describe("Authentication routes", () => {
  describe("when body is empty", () => {
    it("refuses to signup with an explicit message", async () => {
      const signUpResponse = await request.post(signUpRoute);
      expect(signUpResponse.status).toBe(400);
      expect(signUpResponse.body).toMatchObject({
        message: "No body was provided",
      });
    });
  });

  describe("when all is good", () => {
    it("calls sign up than login, than getMe", async () => {
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

      const { token } = loginResponse.body;
      const getMeResponse = await request
        .get(getMeRoute)
        .set("Authorization", `Bearer ${token}`);
      expect(getMeResponse.body).toMatchObject({
        currentUser: {
          email,
          firstName: "John",
          lastName: "Doe",
        },
      });
    });
  });
});
