import { Wing, UUID } from "@paralogs/shared";

export interface WingRepo {
  findById: (id: UUID) => Promise<Wing | undefined>;
  findByUserId: (userId: UUID) => Promise<Wing[]>;
  save: (wing: Wing) => Promise<void>;
}
