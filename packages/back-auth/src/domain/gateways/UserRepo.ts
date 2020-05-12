import { PilotUuid } from "@paralogs/shared";
import { MaybeAsync } from "purify-ts";
import { ResultAsync } from "@paralogs/back-shared";

import { UserEntity } from "../entities/UserEntity";
import { Email } from "../valueObjects/user/Email";

export interface UserRepo {
  findByEmail: (email: Email) => MaybeAsync<UserEntity>;
  findByUuid: (id: PilotUuid) => MaybeAsync<UserEntity>;
  save: (userEntity: UserEntity) => ResultAsync<void>;
}
