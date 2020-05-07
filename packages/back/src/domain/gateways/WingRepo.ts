import { UserUuid, WingUuid } from "@paralogs/shared";
import { MaybeAsync } from "purify-ts";
import { WingEntity } from "../entities/WingEntity";
import { ResultAsync } from "../core/purifyAdds";

export interface WingRepo {
  findByUuid: (id: WingUuid) => MaybeAsync<WingEntity>;
  findByUserUuid: (userUuid: UserUuid) => Promise<WingEntity[]>;
  save: (wing: WingEntity) => ResultAsync<void>;
}
