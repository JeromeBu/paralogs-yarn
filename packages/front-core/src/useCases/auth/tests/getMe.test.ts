import { makeUserDTO, CurrentUserWithAuthToken } from "@paralogs/shared";
import { Store } from "redux";
import {
  getInMemoryDependencies,
  expectStateToMatch,
  InMemoryDependencies,
} from "../../../testUtils";
import { configureReduxStore, RootState } from "../../../reduxStore";
import { feedWithAuthErrorCreator, feedWithCurrentUserCreator } from "./auth.testUtils";
import { authActions } from "../auth.slice";

describe("GetMe :  recover current user informations", () => {
  let store: Store<RootState>;
  let dependencies: InMemoryDependencies; /* cannot be typed Dependencies because we need to access .currentUser$ */
  let feedWithCurrentUser: (params: CurrentUserWithAuthToken) => void;
  let feedWithError: (errorMessage: string) => void;

  beforeEach(() => {
    dependencies = getInMemoryDependencies();
    store = configureReduxStore(dependencies);
    feedWithError = feedWithAuthErrorCreator(dependencies);
    feedWithCurrentUser = feedWithCurrentUserCreator(dependencies);
  });

  describe("No one is logged in", () => {
    it("warns the user with a message", () => {
      const errorMessage = "You need to authenticate first";

      getMe();
      feedWithError(errorMessage);
      expectStateToMatch(store, {
        auth: {
          error: errorMessage,
          token: null,
          isLoading: false,
        },
      });
    });
  });

  describe("You are logged in", () => {
    it("recovers current user informations", () => {
      const currentUser = makeUserDTO();
      const token = "someFakeToken";
      getMe();
      feedWithCurrentUser({
        currentUser,
        token,
      });
      expectStateToMatch(store, {
        auth: {
          currentUser,
          token,
        },
      });
      expect(dependencies.clientStorage.get("token")).toBe(token);
    });
  });

  const getMe = () => store.dispatch(authActions.getMe());
});
