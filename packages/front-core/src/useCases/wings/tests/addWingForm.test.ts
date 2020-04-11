import { Store } from "redux";

import { RootState, configureReduxStore } from "../../../reduxStore";
import {
  expectStateToMatch,
  InMemoryDependencies,
  getInMemoryDependencies,
} from "../../../testUtils";
import { wingActions } from "../wings.slice";

describe("Add a wing", () => {
  let store: Store<RootState>;
  let dependencies: InMemoryDependencies; /* cannot be typed APIGateway because we need to access .wings$ */

  beforeEach(() => {
    dependencies = getInMemoryDependencies();
    store = configureReduxStore(dependencies);
  });

  it("shows add wing form, then hides it", () => {
    store.dispatch(wingActions.showAddWingForm());
    expectStateToMatch(store, {
      wings: {
        isAddWingFormVisible: true,
      },
    });
    store.dispatch(wingActions.hideAddWingForm());
    expectStateToMatch(store, {
      wings: {
        isAddWingFormVisible: false,
      },
    });
  });
});
