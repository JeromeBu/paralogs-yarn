import _ from "lodash";
import { FlightDTO } from "../DTOs";
import { uuid } from "../generalTypes/uuid";
import { makeWingDTO } from "./wingDTOBuilder";

export const makeFlightDTO = (flightParams?: Partial<FlightDTO>): FlightDTO => {
  const randomFlight: FlightDTO = {
    id: uuid(),
    userId: uuid(),
    wingId: makeWingDTO().id,
    date: new Date().toUTCString(),
    site: "La scia",
    time: "12h30",
    duration: 55,
  };

  const flight = _.merge({}, randomFlight, flightParams);
  return flight;
};
