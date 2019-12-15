import { Flight, FlightId, UserId, WingId } from "@paralogs/shared";
import _ from "lodash";

export const makeflight = (flightParams?: Partial<Flight>): Flight => {
  const randomFlight: Flight = {
    id: FlightId.create(),
    userId: UserId.create(),
    wingId: WingId.create(),
    date: new Date().toUTCString(),
    site: "La scia",
    time: "12h30",
    duration: 55,
  };
  const flight = _.merge(randomFlight, flightParams);
  return flight;
};
