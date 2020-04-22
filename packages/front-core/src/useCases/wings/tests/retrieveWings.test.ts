import { Store } from "redux";
import { WingDTO, makeWingDTO } from "@paralogs/shared";
import { RootState, configureReduxStore } from "../../../reduxStore";
import {
  InMemoryDependencies,
  getInMemoryDependencies,
  expectStateToMatchCreator,
  ExpectStateToMatch,
} from "../../../testUtils";
import { wingActions } from "../wings.slice";

describe("Retrieve wings", () => {
  let store: Store<RootState>;
  let dependencies: InMemoryDependencies;
  let expectStateToMatch: ExpectStateToMatch;

  beforeEach(() => {
    dependencies = getInMemoryDependencies();
    store = configureReduxStore(dependencies);
    expectStateToMatch = expectStateToMatchCreator(store.getState(), store);
  });

  it("gets all the Wings", () => {
    const wing1 = makeWingDTO();
    const wing2 = makeWingDTO({ model: "Koyot 2", brand: "Nviuk" });
    const someWings: WingDTO[] = [wing1, wing2];
    retrieveWings();
    feedWithWings(someWings);
    expectStateToMatch({
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
    expectStateToMatch({
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
