import { Store } from "redux";
import { WingDTO, makeWingDTO } from "@paralogs/shared";
import { RootState, configureReduxStore } from "../../../reduxStore";
import {
  expectStateToMatch,
  InMemoryDependencies,
  getInMemoryDependencies,
} from "../../../testUtils";
import { wingActions } from "../wings.slice";

describe("Retrieve wings", () => {
  let store: Store<RootState>;
  let dependencies: InMemoryDependencies; /* cannot be typed APIGateway because we need to access .wings$ */

  beforeEach(() => {
    dependencies = getInMemoryDependencies();
    store = configureReduxStore(dependencies);
  });

  it("gets all the Wings", () => {
    const wing1 = makeWingDTO();
    const wing2 = makeWingDTO({ model: "Koyot 2", brand: "Nviuk" });
    const someWings: WingDTO[] = [wing1, wing2];
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
        error: errorToDisplay,
        isLoading: false,
        isSaving: false,
      },
    });
  });

  const retrieveWings = () => store.dispatch(wingActions.retrieveWingsRequest());

  const feedWithWings = (wings: WingDTO[]) => dependencies.wingGateway.wings$.next(wings);
  const feedWithError = (errorMessage: string) => {
    dependencies.wingGateway.wings$.error(errorMessage);
  };
});
