import { Store } from "redux";
import { FlightDTO, makeFlightDTO, makeWingDTO } from "@paralogs/shared";
import { RootState, configureReduxStore } from "../../../reduxStore";
import {
  expectStateToMatch,
  getInMemoryDependencies,
  InMemoryDependencies,
} from "../../../testUtils";
import { flightActions } from "../flights.slice";

describe("Add a flight", () => {
  let store: Store<RootState>;
  let dependencies: InMemoryDependencies; /* cannot be typed Dependencies because we need to access .flights$ */

  beforeEach(() => {
    dependencies = getInMemoryDependencies();
    store = configureReduxStore(dependencies);
  });

  it("adds a new flight", () => {
    const wingDto = makeWingDTO();
    const flightDto = makeFlightDTO({ wingId: wingDto.id });
    addFlight(flightDto);
    feedWithFlight(flightDto);
    expectStateToMatch(store, {
      flights: {
        data: [flightDto],
        isLoading: false,
        isSaving: false,
        isAddFlightFormVisible: false,
      },
    });
  });

  const feedWithFlight = (flight: FlightDTO) =>
    dependencies.flightGateway.flights$.next([flight]);

  const addFlight = (flight: FlightDTO) =>
    store.dispatch(flightActions.addFlightRequest(flight));
});
