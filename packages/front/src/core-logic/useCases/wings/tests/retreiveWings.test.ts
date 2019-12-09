import { Store } from "redux";

import { Wing } from "@paralogs/shared";

import { RootState, configureReduxStore } from "../../../reduxStore";
import { makeWing } from "../../wings/tests/wingBuilder";
import {
  expectStateToMatch,
  InMemoryDependencies,
  getInMemoryDependencies,
} from "../../../testUtils";
import { wingsActions } from "../wings.actions";

describe("Retreive wings", () => {
  let store: Store<RootState>;
  let dependencies: InMemoryDependencies; /* cannot be typed APIGateway because we need to access .wings$ */

  beforeEach(() => {
    dependencies = getInMemoryDependencies();
    store = configureReduxStore(dependencies);
  });

  it("gets all the Wings", () => {
    const wing1 = makeWing();
    const wing2 = makeWing({ model: "Koyot 2", brand: "Nviuk" });
    const someWings: Wing[] = [wing1, wing2];
    retrieveWings();
    feedWithWings(someWings);
    expectStateToMatch(store, {
      wings: {
        data: someWings,
        isLoading: false,
        isSaving: false,
      },
    });
  });

  it("shows error if there is trouble with fetching", () => {
    const errorToDisplay = "Could not fetch";
    retrieveWings();
    feedWithError(errorToDisplay);
    expectStateToMatch(store, {
      wings: {
        data: [],
        error: new Error(errorToDisplay),
        isLoading: false,
        isSaving: false,
      },
    });
  });

  const retrieveWings = () => store.dispatch(wingsActions.retreiveWingsRequest());

  const feedWithWings = (wings: Wing[]) => dependencies.wingGateway.wings$.next(wings);

  const feedWithError = (errorMessage: string) => {
    dependencies.wingGateway.wings$.error(new Error(errorMessage));
  };
});