import _ from "lodash";
import * as faker from "faker";
import { uuid } from "../generalTypes/uuid";
import { UserDTO } from "../DTOs";

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
