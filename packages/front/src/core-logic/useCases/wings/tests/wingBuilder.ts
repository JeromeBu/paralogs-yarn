import { WingDTO, uuid } from "@paralogs/shared";
import _ from "lodash";

export const makeWingDTO = (wingParams?: Partial<WingDTO>): WingDTO => {
  const randomWing: WingDTO = {
    id: uuid(),
    userId: uuid(),
    brand: "Nova",
    model: "Ion 5",
    flightTimePriorToOwn: 0,
    ownerFrom: new Date().toUTCString(),
  };
  const wing = _.merge({}, randomWing, wingParams);
  return wing;
};
