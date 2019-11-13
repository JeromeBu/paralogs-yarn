import { Flight, uuid } from "@paralogs/shared";

import { makeWing } from "../wings/tests/wingBuilder";

const wing = makeWing();

export const flightsFixtures: Flight[] = [
  {
    id: uuid(),
    date: new Date("2019-10-28").toUTCString(),
    duration: 120,
    time: "14:42",
    site: "La scia",
    wing,
  },
  {
    id: uuid(),
    date: new Date("2019-10-23").toUTCString(),
    duration: 34,
    time: "17:20",
    site: "Saint-Hilaire",
    wing,
  },
];
