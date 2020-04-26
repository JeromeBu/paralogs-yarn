import { WingDTO, makeWingDTO } from "@paralogs/shared";
import { WingEntity } from "../entities/WingEntity";

export const makeWingEntity = (wingParams?: Partial<WingDTO>): WingEntity => {
  const wingDto = makeWingDTO(wingParams);
  return WingEntity.create(wingDto).getOrThrow();
};
