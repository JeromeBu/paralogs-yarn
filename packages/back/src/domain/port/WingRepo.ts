import { Wing, UUID } from "@paralogs/shared";

export interface WingRepo {
  findById: (id: UUID) => Promise<Wing | undefined>;
  save: (wing: Wing) => Promise<void>;
}
