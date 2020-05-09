import { UserUuid, WingUuid } from "@paralogs/shared";
import { ResultAsync } from "@paralogs/back-shared";
import { MaybeAsync } from "purify-ts";
import { WingEntity } from "../entities/WingEntity";

export interface WingRepo {
  findByUuid: (id: WingUuid) => MaybeAsync<WingEntity>;
  findByUserUuid: (userUuid: UserUuid) => Promise<WingEntity[]>;
  save: (wing: WingEntity) => ResultAsync<void>;
}
