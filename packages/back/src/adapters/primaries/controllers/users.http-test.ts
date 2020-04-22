import { SignUpParams, signUpRoute, UpdateUserDTO, usersRoute } from "@paralogs/shared";
import supertest from "supertest";
import { app } from "../express/server";

const request = supertest(app);

describe("Users routes", () => {
  const email = "john.doe@mail.com";
  const password = "Bépo1234";
  const signUpParams: SignUpParams = {
    email,
    firstName: "John",
    lastName: "Doe",
    password,
  };

  it("updates some user's info", async () => {
    const {
      body: { token },
    } = await request.post(signUpRoute).send(signUpParams);

    const updateUserParams: UpdateUserDTO = {
      firstName: "Newfirstname",
      lastName: "Newlastname",
    };

    const response = await request
      .put(usersRoute)
      .send(updateUserParams)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
  });
});
