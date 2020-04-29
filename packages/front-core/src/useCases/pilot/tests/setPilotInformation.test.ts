import { Store } from "redux";
import { makePilotDTO, makeUserDTO } from "@paralogs/shared";
import {
  ExpectStateToMatch,
  expectStateToMatchCreator,
  getInMemoryDependencies,
  InMemoryDependencies,
} from "../../../testUtils";
import { configureReduxStore, RootState } from "../../../reduxStore";
import { authActions } from "../../auth/auth.slice";

describe("set pilot information", () => {
  let store: Store<RootState>;
  let dependencies: InMemoryDependencies;
  let expectStateToMatch: ExpectStateToMatch;

  beforeEach(() => {
    dependencies = getInMemoryDependencies();
    store = configureReduxStore(dependencies);
    expectStateToMatch = expectStateToMatchCreator(store.getState(), store);
  });

  describe("when user authenticates successfully", () => {
    it("sets correctly the pilot information", async () => {
      const currentUser = makeUserDTO();
      const pilotInformation = makePilotDTO();
      const token = "someFakeToken";

      store.dispatch(
        authActions.authenticationSucceeded({ currentUser, pilotInformation, token }),
      );

      expectStateToMatch({
        auth: {
          currentUser,
          token,
        },
        pilot: {
          pilotInformation,
        },
      });
    });
  });
});
