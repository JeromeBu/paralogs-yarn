import _ from "lodash";
import * as faker from "faker";
import uuid from "uuid";
import { PilotDTO } from "../DTOs";

export const makePilotDTO = (pilotParams?: Partial<PilotDTO>): PilotDTO => {
  const randomUser: PilotDTO = {
    uuid: uuid(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
  };
  const pilot = _.merge({}, randomUser, pilotParams);
  return pilot;
};
