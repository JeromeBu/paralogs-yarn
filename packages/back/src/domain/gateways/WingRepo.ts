import { WingUuid, UserUuid, Result } from "@paralogs/shared";
import { WingEntity } from "../entities/WingEntity";

export interface WingRepo {
  findByUuid: (id: WingUuid) => Promise<WingEntity | undefined>;
  findByUserUuid: (userUuid: UserUuid) => Promise<WingEntity[]>;
  save: (wing: WingEntity) => Promise<Result<void>>;
}
