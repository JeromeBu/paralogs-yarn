import { Store } from "redux";
import { WingDTO, makeWingDTO, AddWingDTO } from "@paralogs/shared";
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

  it("adds a new wing", async () => {
    const wingDto = makeWingDTO();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { userId, ...addWingDTO } = wingDto;

    feedWithWing(wingDto);
    addWing(addWingDTO);
    expectStateToMatch({
      wings: {
        isSaving: false,
        data: [wingDto],
      },
    });
  });

  const feedWithWing = (wingDTO: WingDTO) =>
    dependencies.wingGateway.wings$.next([wingDTO]);

  const addWing = (wing: AddWingDTO) =>
    store.dispatch(wingActions.addWingRequested(wing));
});
