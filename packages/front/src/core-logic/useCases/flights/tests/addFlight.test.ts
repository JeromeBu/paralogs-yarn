import { Store } from "redux";

import { uuid, Flight } from "@paralogs/shared";

import { RootState, configureReduxStore } from "../../../reduxStore";
import { makeWing } from "../../wings/tests/wingBuilder";
import {
  expectStateToMatch,
  getInMemoryDependencies,
  InMemoryDependencies,
} from "../../../testUtils";
import { flightActions } from "../flights.actions";

describe("Add a flight", () => {
  let store: Store<RootState>;
  let dependencies: InMemoryDependencies; /* cannot be typed Dependencies because we need to access .flights$ */

  beforeEach(() => {
    dependencies = getInMemoryDependencies();
    store = configureReduxStore(dependencies);
  });

  it("adds a new flight", () => {
    const wing = makeWing();
    const flight = {
      id: uuid(),
      date: new Date().toUTCString(),
      site: "La scia",
      time: "12h30",
      duration: 55,
      wing,
    };
    addFlight(flight);
    feedWithFlight([flight]);
    expectStateToMatch(store, {
      flights: {
        data: [flight],
        isLoading: false,
        isSaving: false,
      },
    });
  });

  const feedWithFlight = (flights: Flight[]) =>
    dependencies.apiGateway.flights$.next(flights);

  const addFlight = (flight: Flight) =>
    store.dispatch(flightActions.addFlightRequest(flight));
});
