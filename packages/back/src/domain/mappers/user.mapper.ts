import { PilotDTO, UserDTO } from "@paralogs/shared";
import { UserEntity } from "../entities/UserEntity";

export const userMapper = {
  entityToDTO: (userEntity: UserEntity): { user: UserDTO; pilot: PilotDTO } => {
    const { email, firstName, lastName } = userEntity.getProps();

    return {
      user: {
        id: userEntity.id,
        email: email.value,
      },
      pilot: {
        firstName: firstName.value,
        ...(lastName ? { lastName: lastName.value } : {}),
      },
    };
  },
};
