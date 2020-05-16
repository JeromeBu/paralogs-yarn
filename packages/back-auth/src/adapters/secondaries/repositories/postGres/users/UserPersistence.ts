import { UserUuid } from "@paralogs/shared";

export type UserPersistence = {
  id?: number;
  uuid: UserUuid;
  email: string;
  first_name: string;
  last_name?: string;
  hashed_password: string;
  auth_token: string;
};

// Question : comment assurer qu'on a bien toutes les clés dans necessaire dans PilotPersistence au niveau du typage ?
// les clés doivent avoir une correspondance avec les key de UserEntityProps dans UserEntity
