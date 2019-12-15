import { Wing, WingId, UserId } from "@paralogs/shared";

export interface WingRepo {
  findById: (id: WingId) => Promise<Wing | undefined>;
  findByUserId: (userId: UserId) => Promise<Wing[]>;
  save: (wing: Wing) => Promise<void>;
}
