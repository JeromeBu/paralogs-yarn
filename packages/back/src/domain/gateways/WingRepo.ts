import { WingId, UserId } from "@paralogs/shared";
import { WingEntity } from "../entities/WingEntity";

export interface WingRepo {
  findById: (id: WingId) => Promise<WingEntity | undefined>;
  findByUserId: (userId: UserId) => Promise<WingEntity[]>;
  save: (wing: WingEntity) => Promise<void>;
}
