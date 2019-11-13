import { Wing, uuid } from "@paralogs/shared";

export const makeWing = (): Wing => ({
  id: uuid(),
  brand: "Nova",
  model: "Ion 5",
  flightTimePriorToOwn: 0,
  ownerFrom: new Date().toUTCString(),
});
