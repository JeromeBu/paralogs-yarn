import { UserDTO, uuid } from "@paralogs/shared";
import _ from "lodash";
import * as faker from "faker";

export const makeUserDTO = (wingParams?: Partial<UserDTO>): UserDTO => {
  const randomUser: UserDTO = {
    id: uuid(),
    email: faker.internet.email(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
  };
  const wing = _.merge({}, randomUser, wingParams);
  return wing;
};
