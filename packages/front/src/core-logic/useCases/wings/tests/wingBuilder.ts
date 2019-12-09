import { Wing, uuid } from "@paralogs/shared";
import _ from "lodash";

export const makeWing = (wingParams?: Partial<Wing>): Wing => {
  const randomWing: Wing = {
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
