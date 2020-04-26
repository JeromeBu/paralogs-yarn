import { Store } from "redux";
import { makeWingDTO, WingDTO } from "@paralogs/shared";
import { configureReduxStore, RootState } from "../../../reduxStore";
import {
  ExpectStateToMatch,
  expectStateToMatchCreator,
  getInMemoryDependencies,
  InMemoryDependencies,
} from "../../../testUtils";
import { wingActions } from "../wings.slice";

describe("Update wing", () => {
  let store: Store<RootState>;
  let dependencies: InMemoryDependencies;
  let expectStateToMatch: ExpectStateToMatch;

  beforeEach(() => {
    dependencies = getInMemoryDependencies();
    store = configureReduxStore(dependencies);
    expectStateToMatch = expectStateToMatchCreator(store.getState(), store);
  });

  describe("All is good", () => {
    it("the provided field is updated", async () => {
      const wingDto = makeWingDTO();
      // putting the wingDto in place initially (is it a right way ?(using an other action to do that))
      store.dispatch(wingActions.addWingSucceeded(wingDto));
      const newModel = "New model";
      // need to feed before we call dispatch. Is it normal ?
      feedWithWing({ ...wingDto, model: newModel });
      store.dispatch(
        wingActions.updateWingRequested({ id: wingDto.id, model: newModel }),
      );
      expectStateToMatch({
        wings: {
          isLoading: false,
          isSaving: false,
          isAddWingFormVisible: false,
          data: [{ ...wingDto, model: newModel }],
        },
      });
    });
  });

  const feedWithWing = (wingDTO: WingDTO) =>
    dependencies.wingGateway.wings$.next([wingDTO]);
});
