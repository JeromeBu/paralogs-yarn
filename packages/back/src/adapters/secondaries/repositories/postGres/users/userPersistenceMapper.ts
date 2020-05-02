import { Result } from "@paralogs/shared";
import { UserEntity } from "../../../../../domain/entities/UserEntity";
import { UserPersistence } from "./UserPersistence";
import { Email } from "../../../../../domain/valueObjects/user/Email";
import { PersonName } from "../../../../../domain/valueObjects/user/PersonName";

export const userPersistenceMapper = {
  toPersistence: (userEntity: UserEntity): UserPersistence => {
    const {
      email,
      firstName,
      lastName,
      authToken,
      hashedPassword,
      uuid,
    } = userEntity.getProps();
    return {
      id: userEntity.getIdentity(),
      uuid,
      email: email.value,
      first_name: firstName.value,
      ...(lastName ? { last_name: lastName.value } : {}),
      auth_token: authToken,
      hashed_password: hashedPassword,
    };
  },
  toEntity: (params: UserPersistence): UserEntity => {
    return Result.combine({
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
      .getOrThrow();
  },
};
