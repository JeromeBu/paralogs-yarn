import _ from "lodash";
import * as faker from "faker";
import { uuid } from "../generalTypes/uuid";
import { UserDTO } from "../DTOs";

export const makeUserDTO = (userParams?: Partial<UserDTO>): UserDTO => {
  const randomUser: UserDTO = {
    id: uuid(),
    email: faker.internet.email(),
  };
  const user = _.merge({}, randomUser, userParams);
  return user;
};
