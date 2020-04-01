import { UserEntity, UserPersistence } from "../../../../../domain/entities/UserEntity";

export const userPersistenceMapper = {
  toPersistence: (userEntity: UserEntity): UserPersistence => {
    const {
      email,
      firstName,
      lastName,
      authToken,
      hashedPassword,
      id,
    } = userEntity.getProps();
    return {
      id,
      email: email.value,
      first_name: firstName.value,
      ...(lastName ? { last_name: lastName.value } : {}),
      auth_token: authToken,
      hashed_password: hashedPassword,
    };
  },
  toEntity: (userPg: UserPersistence): UserEntity => {
    return UserEntity.createFromPersistence(userPg);
  },
};
