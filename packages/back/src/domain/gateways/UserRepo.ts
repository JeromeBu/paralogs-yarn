import { UserUuid } from "@paralogs/shared";
import { MaybeAsync } from "purify-ts";
import { ResultAsync } from "@paralogs/back-shared";

import { UserEntity } from "../entities/UserEntity";
import { Email } from "../valueObjects/user/Email";

export interface UserRepo {
  findByEmail: (email: Email) => MaybeAsync<UserEntity>;
  findByUuid: (id: UserUuid) => MaybeAsync<UserEntity>;
  save: (userEntity: UserEntity) => ResultAsync<void>;
}
