import { Store } from "redux";
import * as _ from "lodash";

import { FlightDTO, uuid, makeUserDTO, makeWingDTO } from "@paralogs/shared";

import { RootState, configureReduxStore } from "../../../reduxStore";
import {
  InMemoryDependencies,
  getInMemoryDependencies,
  expectStateToMatchCreator,
  ExpectStateToMatch,
} from "../../../testUtils";
import { flightActions } from "../flights.slice";

describe("Retrieve flights", () => {
  let store: Store<RootState>;
  let dependencies: InMemoryDependencies;
  let expectStateToMatch: ExpectStateToMatch;

  beforeEach(() => {
    dependencies = getInMemoryDependencies();
    store = configureReduxStore(dependencies);
    expectStateToMatch = expectStateToMatchCreator(store.getState(), store);
  });

  it("gets all the Flights", () => {
    const wing = makeWingDTO();
    const user = makeUserDTO();
    const someFlights: FlightDTO[] = [
      {
        id: uuid(),
        date: new Date("2019-10-10").toUTCString(),
        site: "Le plus récent",
        time: "14:20",
        duration: 60,
        wingId: wing.id,
        userId: user.id,
      },
      {
        id: uuid(),
        date: new Date("2019-09-10").toUTCString(),
        site: "La scia",
        time: "16:10",
        duration: 35,
        wingId: wing.id,
        userId: user.id,
      },
    ];
    retrieveFlights();
    feedWithFlights(someFlights);
    expectStateToMatch({
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
    expectStateToMatch({
      flights: {
        data: [],
        error: errorToDisplay,
        isLoading: false,
        isSaving: false,
      },
    });
  });

  const retrieveFlights = () => store.dispatch(flightActions.retrieveFlightsRequested());

  const feedWithFlights = (flights: FlightDTO[]) =>
    dependencies.flightGateway.flights$.next(flights);

  const feedWithError = (errorMessage: string) => {
    dependencies.flightGateway.flights$.error(errorMessage);
  };

  const expectFlightToBeOrderedByDate = (storeState: Store<RootState>) => {
    const flights = storeState.getState().flights.data;
    const sortedFlights = _.sortBy(flights, ({ date }) => date);
    expect(flights).toEqual(sortedFlights);
  };
});
