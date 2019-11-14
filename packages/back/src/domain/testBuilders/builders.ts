import { Wing, uuid } from "@paralogs/shared";
import _ from "lodash";

export const makeWing = (wingParams?: Partial<Wing>): Wing => {
  const randomWing: Wing = {
    id: uuid(),
    brand: "Nova",
    model: "Ion 5",
    flightTimePriorToOwn: 130,
    ownerFrom: new Date().toUTCString(),
  };
  const fakeWing = _.merge(randomWing, wingParams);
  return fakeWing;
};
