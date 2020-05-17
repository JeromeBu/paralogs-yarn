import * as faker from "faker";
import merge from "ramda/src/merge";
import uuid from "uuid";

import { PilotDTO } from "../DTOs";

export const makePilotDTO = (pilotParams: Partial<PilotDTO> = {}): PilotDTO => {
  const randomUser: PilotDTO = {
    uuid: uuid(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
  };
  const pilot = merge(randomUser, pilotParams);
  return pilot;
};
