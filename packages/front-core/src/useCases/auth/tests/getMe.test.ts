import { makeUserDTO, CurrentUserWithAuthToken, makePilotDTO } from "@paralogs/shared";
import { Store } from "redux";
import {
  getInMemoryDependencies,
  expectStateToMatchCreator,
  InMemoryDependencies,
  ExpectStateToMatch,
} from "../../../testUtils";
import { configureReduxStore, RootState } from "../../../reduxStore";
import { feedWithAuthErrorCreator, feedWithCurrentUserCreator } from "./auth.testUtils";
import { authActions } from "../auth.slice";

describe("GetMe :  recover current user information", () => {
  let store: Store<RootState>;
  let dependencies: InMemoryDependencies;
  let feedWithCurrentUser: (params: CurrentUserWithAuthToken) => void;
  let feedWithError: (errorMessage: string) => void;
  let expectStateToMatch: ExpectStateToMatch;

  beforeEach(() => {
    dependencies = getInMemoryDependencies();
    store = configureReduxStore(dependencies);
    feedWithError = feedWithAuthErrorCreator(dependencies);
    feedWithCurrentUser = feedWithCurrentUserCreator(dependencies);
    expectStateToMatch = expectStateToMatchCreator(store.getState(), store);
  });

  describe("No one is logged in", () => {
    it("warns the user with a message", () => {
      const errorMessage = "You need to authenticate first";

      getMe();
      feedWithError(errorMessage);
      expectStateToMatch({
        auth: {
          error: errorMessage,
          token: null,
          isLoading: false,
        },
      });
    });
  });

  describe("You are logged in", () => {
    it("recovers current user information", () => {
      const currentUser = makeUserDTO();
      const pilotInformation = makePilotDTO();
      const token = "someFakeToken";
      getMe();
      feedWithCurrentUser({
        currentUser,
        pilotInformation,
        token,
      });
      expectStateToMatch({
        auth: {
          currentUser,
          token,
        },
        pilot: { pilotInformation },
      });
      expect(dependencies.clientStorage.get("token")).toBe(token);
    });
  });

  const getMe = () => store.dispatch(authActions.getMeRequested());
});
