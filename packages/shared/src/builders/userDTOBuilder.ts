import _ from "lodash";
import { uuid } from "../generalTypes/uuid";
import { UserDTO } from "../DTOs";

export const makeUserDTO = (userParams?: Partial<UserDTO>): UserDTO => {
  const randomUser: UserDTO = {
    id: uuid(),
    email: "fake@mail.com",
    firstName: "myFirstName",
    lastName: "myLastName",
  };
  const user = _.merge({}, randomUser, userParams);
  return user;
};
