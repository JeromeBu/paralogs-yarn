import { Store } from "redux";

import { RootState, configureReduxStore } from "../../../reduxStore";
import {
  expectStateToMatchCreator,
  InMemoryDependencies,
  getInMemoryDependencies,
  ExpectStateToMatch,
} from "../../../testUtils";
import { wingActions } from "../wings.slice";

describe("Add a wing", () => {
  let store: Store<RootState>;
  let dependencies: InMemoryDependencies;
  let expectStateToMatch: ExpectStateToMatch;

  beforeEach(() => {
    dependencies = getInMemoryDependencies();
    store = configureReduxStore(dependencies);
    expectStateToMatch = expectStateToMatchCreator(store.getState(), store);
  });

  it("shows add wing form, then hides it", () => {
    store.dispatch(wingActions.showAddWingForm());
    expectStateToMatch({
      wings: {
        isAddWingFormVisible: true,
      },
    });
    store.dispatch(wingActions.hideAddWingForm());
    expectStateToMatch({
      wings: {
        isAddWingFormVisible: false,
      },
    });
  });
});
