import { combineEithers } from "@paralogs/back-shared";

import { UserEntity } from "../../../../../domain/entities/UserEntity";
import { UserPersistence } from "./UserPersistence";
import { Email } from "../../../../../domain/valueObjects/user/Email";

export const userPersistenceMapper = {
  toPersistence: (userEntity: UserEntity): UserPersistence => {
    const { email, authToken, hashedPassword, uuid } = userEntity.getProps();
    return {
      id: userEntity.getIdentity(),
      uuid,
      email: email.value,
      auth_token: authToken,
      hashed_password: hashedPassword,
    };
  },
  toEntity: (params: UserPersistence): UserEntity => {
    return combineEithers({
      email: Email.create(params.email),
    })
      .map(validResults => {
        const userEntity = UserEntity.fromDTO({
          ...validResults,
          uuid: params.uuid,
          authToken: params.auth_token,
          hashedPassword: params.hashed_password,
        });
        userEntity.setIdentity(params.id);
        return userEntity;
      })
      .ifLeft(error => {
        throw error;
      })
      .extract() as UserEntity;
  },
};
