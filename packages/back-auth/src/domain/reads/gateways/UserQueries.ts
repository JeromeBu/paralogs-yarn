import { CurrentUserWithAuthToken, UserUuid } from "@paralogs/shared";
import { MaybeAsync } from "purify-ts";

export interface UserQueries {
  findByUuid(uuid: UserUuid): MaybeAsync<CurrentUserWithAuthToken>;
}
