import { Wing, WingId, UserId } from "@paralogs/shared";
import _ from "lodash";

export const makeBackendWing = (wingParams?: Partial<Wing>): Wing => {
  const randomWing: Wing = {
    id: WingId.create(),
    userId: UserId.create(),
    brand: "Nova",
    model: "Ion 5",
    flightTimePriorToOwn: 130,
    ownerFrom: new Date().toUTCString(),
  };
  const fakeWing = _.merge(randomWing, wingParams);
  return fakeWing;
};
