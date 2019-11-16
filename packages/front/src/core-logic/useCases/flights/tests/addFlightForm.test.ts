import { Store } from "redux";

import { RootState, configureReduxStore } from "../../../reduxStore";
import { InMemoryAPIGateway } from "../../../adapters/InMemoryAPIGateway";
import { flightActions } from "../flights.actions";
import { expectStateToMatch } from "../../../testUtils";

describe("Add a flight", () => {
  let store: Store<RootState>;
  let apiGateway: InMemoryAPIGateway; /* cannot be typed APIGateway because we need to access .flights$ */

  beforeEach(() => {
    apiGateway = new InMemoryAPIGateway();
    store = configureReduxStore({ apiGateway });
  });

  it("shows add flight form, then hides it", () => {
    store.dispatch(flightActions.showAddFlightForm());
    expectStateToMatch(store, {
      wings: {
        isAddFlightFormVisible: true,
      },
    });
    store.dispatch(flightActions.hideAddFlightForm());
    expectStateToMatch(store, {
      wings: {
        isAddFlightFormVisible: false,
      },
    });
  });
});
