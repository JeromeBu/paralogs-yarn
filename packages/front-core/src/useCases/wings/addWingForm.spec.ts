import { Store } from "redux";

import { RootState, configureReduxStore } from "../../reduxStore";
import { InMemoryAPIGateway } from "../../adapters/InMemoryAPIGateway";
import { wingsActions } from "./wings.actions";
import { expectStateToMatch } from "../../testUtils";

describe("Add a wing", () => {
  let store: Store<RootState>;
  let apiGateway: InMemoryAPIGateway; /* cannot be typed APIGateway because we need to access .flights$ */

  beforeEach(() => {
    apiGateway = new InMemoryAPIGateway();
    store = configureReduxStore({ apiGateway });
  });

  it("shows add wing form, then hides it", () => {
    store.dispatch(wingsActions.showAddWingForm());
    expectStateToMatch(store, {
      wings: {
        isAddWingFormVisible: true,
      },
    });
    // store.dispatch(flightActions.hideAddFlightForm());
    // expectStateToMatch(store, {
    //   wings: {
    //     isAddWingFormVisible: false,
    //   },
    // });
  });
});
