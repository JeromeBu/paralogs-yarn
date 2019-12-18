import { WingDTO } from "./WingDTO";

export type CreateWingDTO = Omit<WingDTO, "userId">;
