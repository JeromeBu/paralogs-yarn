import { Store } from "redux";
import _ from "lodash";

import { Flight, uuid } from "@paralogs/shared";

import { RootState, configureReduxStore } from "../../../reduxStore";
import { makeWing } from "../../wings/tests/wingBuilder";
import {
  expectStateToMatch,
  InMemoryDependencies,
  getInMemoryDependencies,
} from "../../../testUtils";
import { flightActions } from "../flights.actions";

describe("Retreive flights", () => {
  let store: Store<RootState>;
  let dependencies: InMemoryDependencies; /* cannot be typed Dependencies because we need to access .flights$ */

  beforeEach(() => {
    dependencies = getInMemoryDependencies();
    store = configureReduxStore(dependencies);
  });

  it("gets all the Flights", () => {
    const wing = makeWing();
    const someFlights: Flight[] = [
      {
        id: uuid(),
        date: new Date("2019-10-10").toUTCString(),
        site: "Le plus récent",
        time: "14:20",
        duration: 60,
        wing,
      },
      {
        id: uuid(),
        date: new Date("2019-09-10").toUTCString(),
        site: "La scia",
        time: "16:10",
        duration: 35,
        wing,
      },
    ];
    retrieveFlights();
    feedWithFlights(someFlights);
    expectStateToMatch(store, {
      flights: {
        data: someFlights,
        isLoading: false,
        isSaving: false,
      },
    });
    // QUESTION: how to implement next test... (sorting)
    // I belive it is mostly the backend role to sort the results
    // (we are only testing mock values so it is quite useless)
    expectFlightToBeOrderedByDate(store);
  });

  it("shows error if there is trouble with fetching", () => {
    const errorToDisplay = "Could not fetch";
    retrieveFlights();
    feedWithError(errorToDisplay);
    expectStateToMatch(store, {
      flights: {
        data: [],
        error: { message: errorToDisplay },
        isLoading: false,
        isSaving: false,
      },
    });
  });

  const retrieveFlights = () => store.dispatch(flightActions.retreiveFlightsRequest());

  const feedWithFlights = (flights: Flight[]) =>
    dependencies.flightGateway.flights$.next(flights);

  const feedWithError = (errorMessage: string) => {
    dependencies.flightGateway.flights$.error(new Error(errorMessage));
  };

  const expectFlightToBeOrderedByDate = (storeState: Store<RootState>) => {
    const flights = storeState.getState().flights.data;
    const sortedFlights = _.sortBy(flights, ({ date }) => date);
    expect(flights).toEqual(sortedFlights);
  };
});
