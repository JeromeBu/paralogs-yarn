import { Store } from "redux";
import { makePilotDTO, makeUserDTO } from "@paralogs/shared";
import { configureReduxStore, RootState } from "../../../reduxStore";
import {
  ExpectStateToMatch,
  expectStateToMatchCreator,
  getInMemoryDependencies,
  InMemoryDependencies,
} from "../../../testUtils";
import { pilotActions } from "../pilot.slice";
import { authActions } from "../../auth/auth.slice";

describe("update pilot ", () => {
  let store: Store<RootState>;
  let dependencies: InMemoryDependencies;
  let expectStateToMatch: ExpectStateToMatch;

  beforeEach(() => {
    dependencies = getInMemoryDependencies();
    store = configureReduxStore(dependencies);
    expectStateToMatch = expectStateToMatchCreator(store.getState(), store);
  });

  describe("when all is good", () => {
    it("updates the user with the provided data", async () => {
      const currentUser = makeUserDTO();
      const pilotInformation = makePilotDTO();
      const token = "someFakeToken";

      store.dispatch(
        authActions.authenticationSucceeded({ currentUser, pilotInformation, token }),
      );
      const loggedState = store.getState();

      const updateParams = {
        firstName: "NewFirstName",
        lastName: "NewLastName",
      };

      store.dispatch(pilotActions.updatePilotRequested(updateParams));
      expectStateToMatch({
        ...loggedState,
        pilot: {
          isSaving: false,
          pilotInformation: updateParams,
        },
      });
    });
  });
});
