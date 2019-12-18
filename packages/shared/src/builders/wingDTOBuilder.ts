import _ from "lodash";
import { WingDTO } from "../DTOs";
import { uuid } from "../generalTypes/uuid";

export const makeWingDTO = (wingParams?: Partial<WingDTO>): WingDTO => {
  const randomWing: WingDTO = {
    id: uuid(),
    userId: uuid(),
    brand: "Nova",
    model: "Ion 5",
    flightTimePriorToOwn: 0,
    ownerFrom: new Date().toUTCString(),
  };
  const wing = _.merge(randomWing, wingParams);
  return wing;
};
