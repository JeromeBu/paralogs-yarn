import { Store } from "redux";

import { Wing } from "@paralogs/shared";

import { RootState, configureReduxStore } from "../../../reduxStore";
import { InMemoryAPIGateway } from "../../../adapters/InMemoryAPIGateway";
import { makeWing } from "./wingBuilder";
import { expectStateToMatch } from "../../../testUtils";
import { wingsActions } from "../wings.actions";

describe("Add a wing", () => {
  let store: Store<RootState>;
  let apiGateway: InMemoryAPIGateway; /* cannot be typed APIGateway because we need to access .flights$ */

  beforeEach(() => {
    apiGateway = new InMemoryAPIGateway();
    store = configureReduxStore({ apiGateway });
  });

  it("adds a new flight", async () => {
    const wing = makeWing();

    addWing(wing);
    expectStateToMatch(store, {
      wings: {
        isSaving: false,
        data: [wing],
      },
    });
  });

  const addWing = (wing: Wing) => store.dispatch(wingsActions.addWingRequest(wing));
});
