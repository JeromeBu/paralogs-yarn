import { Store } from "redux";

import { uuid, Flight } from "@paralogs/shared";

import { RootState, configureReduxStore } from "../../../reduxStore";
import { InMemoryAPIGateway } from "../../../adapters/InMemoryAPIGateway";
import { makeWing } from "../../wings/tests/wingBuilder";
import { expectStateToMatch } from "../../../testUtils";
import { flightActions } from "../flights.actions";

describe("Add a flight", () => {
  let store: Store<RootState>;
  let apiGateway: InMemoryAPIGateway; /* cannot be typed APIGateway because we need to access .flights$ */

  beforeEach(() => {
    apiGateway = new InMemoryAPIGateway();
    store = configureReduxStore({ apiGateway });
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
    apiGateway.flights$.next([flight]);
    expectStateToMatch(store, {
      wings: {
        data: [flight],
        isLoading: false,
        isSaving: false,
      },
    });
  });

  const addFlight = (flight: Flight) => store.dispatch(flightActions.addFlight(flight));
});
