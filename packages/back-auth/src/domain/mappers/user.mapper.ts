import { UserDTO } from "@paralogs/shared";
import { UserEntity } from "../entities/UserEntity";

export const userMapper = {
  entityToDTO: (userEntity: UserEntity): UserDTO => ({
    uuid: userEntity.uuid,
    email: userEntity.email.value,
  }),
};
