import { Store } from "redux";

import { Wing } from "@paralogs/shared";

import { RootState, configureReduxStore } from "../../../reduxStore";
import { makeWing } from "./wingBuilder";
import {
  expectStateToMatch,
  InMemoryDependencies,
  getInMemoryDependencies,
} from "../../../testUtils";
import { wingsActions } from "../wings.actions";

describe("Add a wing", () => {
  let store: Store<RootState>;
  let dependencies: InMemoryDependencies; /* cannot be typed Dependencies because we need to access .wings$ */

  beforeEach(() => {
    dependencies = getInMemoryDependencies();
    store = configureReduxStore(dependencies);
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
