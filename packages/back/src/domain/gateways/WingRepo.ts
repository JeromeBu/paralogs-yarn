import { WingUuid, UserUuid, Result } from "@paralogs/shared";
import { WingEntity } from "../entities/WingEntity";

export interface WingRepo {
  findById: (id: WingUuid) => Promise<WingEntity | undefined>;
  findByUserId: (userId: UserUuid) => Promise<WingEntity[]>;
  save: (wing: WingEntity) => Promise<Result<void>>;
}
