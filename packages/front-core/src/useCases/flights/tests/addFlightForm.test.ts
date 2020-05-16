import { Store } from "redux";

import { configureReduxStore, RootState } from "../../../reduxStore";
import {
  ExpectStateToMatch,
  expectStateToMatchCreator,
  getInMemoryDependencies,
  InMemoryDependencies,
} from "../../../testUtils";
import { flightActions } from "../flights.slice";

describe("Add a flight", () => {
  let store: Store<RootState>;
  let dependencies: InMemoryDependencies;
  let expectStateToMatch: ExpectStateToMatch;

  beforeEach(() => {
    dependencies = getInMemoryDependencies();
    store = configureReduxStore(dependencies);
    expectStateToMatch = expectStateToMatchCreator(store.getState(), store);
  });

  it("shows add flight form, then hides it", () => {
    store.dispatch(flightActions.showAddFlightForm());
    expectStateToMatch({
      flights: {
        isAddFlightFormVisible: true,
      },
    });
    store.dispatch(flightActions.hideAddFlightForm());
    expectStateToMatch({
      flights: {
        isAddFlightFormVisible: false,
      },
    });
  });
});
