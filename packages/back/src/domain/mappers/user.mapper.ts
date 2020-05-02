import { PilotDTO, UserDTO } from "@paralogs/shared";
import { UserEntity } from "../entities/UserEntity";

export const userMapper = {
  entityToDTO: (userEntity: UserEntity): { user: UserDTO; pilot: PilotDTO } => {
    const { email, firstName, lastName } = userEntity.getProps();

    return {
      user: {
        uuid: userEntity.uuid,
        email: email.value,
      },
      pilot: {
        firstName: firstName.value,
        ...(lastName ? { lastName: lastName.value } : {}),
      },
    };
  },
};
