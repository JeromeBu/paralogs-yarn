import _ from "lodash";
import * as faker from "faker";
import { generateUuid } from "../generalTypes/uuid";
import { UserDTO } from "../DTOs";

export const makeUserDTO = (userParams?: Partial<UserDTO>): UserDTO => {
  const randomUser: UserDTO = {
    uuid: generateUuid(),
    email: faker.internet.email(),
    firstName: faker.name.firstName(),
  };
  const user = _.merge({}, randomUser, userParams);
  return user;
};
