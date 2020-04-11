import { Store } from "redux";

import { RootState, configureReduxStore } from "../../../reduxStore";
import {
  expectStateToMatch,
  InMemoryDependencies,
  getInMemoryDependencies,
} from "../../../testUtils";
import { flightActions } from "../flights.slice";

describe("Add a flight", () => {
  let store: Store<RootState>;
  let dependencies: InMemoryDependencies; /* cannot be typed Dependencies because we need to access .flights$ */

  beforeEach(() => {
    dependencies = getInMemoryDependencies();
    store = configureReduxStore(dependencies);
  });

  it("shows add flight form, then hides it", () => {
    store.dispatch(flightActions.showAddFlightForm());
    expectStateToMatch(store, {
      flights: {
        isAddFlightFormVisible: true,
      },
    });
    store.dispatch(flightActions.hideAddFlightForm());
    expectStateToMatch(store, {
      flights: {
        isAddFlightFormVisible: false,
      },
    });
  });
});
