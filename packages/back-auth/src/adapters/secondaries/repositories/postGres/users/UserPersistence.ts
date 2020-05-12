import { PilotUuid } from "@paralogs/shared";

export type UserPersistence = {
  id: number;
  uuid: PilotUuid;
  email: string;
  hashed_password: string;
  auth_token: string;
};

// Question : comment assurer qu'on a bien toutes les clés dans necessaire dans PilotPersistence au niveau du typage ?
// les clés doivent avoir une correspondance avec les key de UserEntityProps dans UserEntity
