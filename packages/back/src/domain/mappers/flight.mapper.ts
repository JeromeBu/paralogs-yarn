import { FlightDTO } from "@paralogs/shared";

import { FlightEntity } from "../entities/FlightEntity";

export const flightMapper = {
  entityToDTO: (flightEntity: FlightEntity): FlightDTO => {
    const flightProps = flightEntity.getProps();
    return flightProps;
  },
};
