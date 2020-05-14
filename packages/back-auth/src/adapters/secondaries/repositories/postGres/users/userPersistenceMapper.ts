import { combineEithers, PersonName } from "@paralogs/back-shared";

import { UserEntity } from "../../../../../domain/entities/UserEntity";
import { UserPersistence } from "./UserPersistence";
import { Email } from "../../../../../domain/valueObjects/user/Email";

export const userPersistenceMapper = {
  toPersistence: (userEntity: UserEntity): UserPersistence => {
    const {
      email,
      authToken,
      hashedPassword,
      uuid,
      firstName,
      lastName,
    } = userEntity.getProps();
    return {
      id: userEntity.getIdentity(),
      uuid,
      email: email.value,
      first_name: firstName.value,
      last_name: lastName?.value,
      auth_token: authToken,
      hashed_password: hashedPassword,
    };
  },
  toEntity: (params: UserPersistence): UserEntity => {
    return combineEithers({
      email: Email.create(params.email),
      firstName: PersonName.create(params.first_name),
      lastName: PersonName.create(params.last_name),
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