import {
  AddFlightDTO,
  AddWingDTO,
  flightsRoute,
  SignUpParams,
  signUpRoute,
  uuid,
  WingId,
  wingsRoute,
} from "@paralogs/shared";
import supertest from "supertest";
import { app } from "../express/server";

const request = supertest(app);

describe("Flights routes", () => {
  const email = "john.doe@mail.com";
  const password = "Bépo1234";
  const signUpParams: SignUpParams = {
    email,
    firstName: "John",
    lastName: "Doe",
    password,
  };

  const brand = "Nova";
  const model = "Ion 5";
  const wingId: WingId = uuid();
  const addWingParams: AddWingDTO = {
    id: wingId,
    brand,
    model,
    ownerFrom: new Date("2020-03-03").toUTCString(),
    flightTimePriorToOwn: 500,
  };

  it("adds a flight then retrieves it", async () => {
    const {
      body: { token },
    } = await request.post(signUpRoute).send(signUpParams);

    await request
      .post(wingsRoute)
      .send(addWingParams)
      .set("Authorization", `Bearer ${token}`);

    const addFlightParams: AddFlightDTO = {
      id: uuid(),
      date: new Date("2020-04-04").toUTCString(),
      duration: 35,
      site: "La scia",
      time: "15h35",
      wingId,
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
