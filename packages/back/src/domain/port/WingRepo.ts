import { WingEntity } from "../entities/WingEntity";
import { WingId } from "../valueObjects/WingId";
import { UserId } from "../valueObjects/user/UserId";

export interface WingRepo {
  findById: (id: WingId) => Promise<WingEntity | undefined>;
  findByUserId: (userId: UserId) => Promise<WingEntity[]>;
  save: (wing: WingEntity) => Promise<void>;
}
