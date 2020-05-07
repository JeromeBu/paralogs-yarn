import { UserUuid } from "@paralogs/shared";
import { MaybeAsync } from "purify-ts";

import { UserEntity } from "../entities/UserEntity";
import { Email } from "../valueObjects/user/Email";
import { ResultAsync } from "../core/purifyAdds";

export interface UserRepo {
  findByEmail: (email: Email) => MaybeAsync<UserEntity>;
  findByUuid: (id: UserUuid) => MaybeAsync<UserEntity>;
  save: (userEntity: UserEntity) => ResultAsync<void>;
}
