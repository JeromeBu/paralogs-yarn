import { Wing, UserId, WingId } from "@paralogs/shared";
import _ from "lodash";

export const makeWing = (wingParams?: Partial<Wing>): Wing => {
  const randomWing: Wing = {
    id: WingId.create(),
    userId: UserId.create(),
    brand: "Nova",
    model: "Ion 5",
    flightTimePriorToOwn: 0,
    ownerFrom: new Date().toUTCString(),
  };
  const wing = _.merge(randomWing, wingParams);
  return wing;
};
