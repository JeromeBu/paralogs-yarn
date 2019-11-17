import { Store } from "redux";

import { RootState, configureReduxStore } from "../../../reduxStore";
import { InMemoryAPIGateway } from "../../../adapters/InMemoryAPIGateway";
import { wingsActions } from "../wings.actions";
import { expectStateToMatch } from "../../../testUtils";
import { APIGateway } from "../../api.gateway";

describe("Add a wing", () => {
  let store: Store<RootState>;
  let apiGateway: APIGateway; /* cannot be typed APIGateway because we need to access .flights$ */

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
    store.dispatch(wingsActions.hideAddWingForm());
    expectStateToMatch(store, {
      wings: {
        isAddWingFormVisible: false,
      },
    });
  });
});
