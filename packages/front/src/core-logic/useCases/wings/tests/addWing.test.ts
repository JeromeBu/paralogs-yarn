import { Store } from "redux";
import { WingDTO, makeWingDTO, AddWingDTO } from "@paralogs/shared";
import { RootState, configureReduxStore } from "../../../reduxStore";
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

  it("adds a new wing", async () => {
    const wingDto = makeWingDTO();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { userId, ...addWingDTO } = wingDto;

    feedWithWing(wingDto);
    addWing(addWingDTO);
    expectStateToMatch(store, {
      wings: {
        isSaving: false,
        data: [wingDto],
      },
    });
  });

  const feedWithWing = (wingDTO: WingDTO) =>
    dependencies.wingGateway.wings$.next([wingDTO]);

  const addWing = (wing: AddWingDTO) => store.dispatch(wingsActions.addWingRequest(wing));
});
