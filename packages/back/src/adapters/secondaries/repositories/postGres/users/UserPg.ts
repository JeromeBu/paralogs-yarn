import { UserId } from "@paralogs/shared";
import { UserEntity } from "../../../../../domain/entities/UserEntity";

export type UserPg = {
  id: UserId;
  email: string;
  firstName: string;
  lastName?: string;
  hashedPassword: string;
  authToken: string;
};
// Question : comment assurer qu'on a bien toutes les clés dans necessaire dans UserPg au niveau du typage ?
// les clés doivent matcher les key de UserEntityProps dans UserEntity

export const userPgMapper = {
  toPg: (userEntity: UserEntity): UserPg => {
    const { email, firstName, lastName, ...props } = userEntity.getProps();
    return {
      ...props,
      email: email.value,
      firstName: firstName.value,
      ...(lastName ? { lastName: lastName.value } : {}),
    };
  },
  toEntity: (userPg: UserPg): UserEntity => {
    return UserEntity.createFromPersistence(userPg);
  },
};
