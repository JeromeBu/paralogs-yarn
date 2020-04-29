import _ from "lodash";
import * as faker from "faker";
import { PilotDTO } from "../DTOs";

export const makePilotDTO = (pilotParams?: Partial<PilotDTO>): PilotDTO => {
  const randomUser: PilotDTO = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
  };
  const pilot = _.merge({}, randomUser, pilotParams);
  return pilot;
};
