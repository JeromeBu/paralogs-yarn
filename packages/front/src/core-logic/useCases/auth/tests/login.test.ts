import { Store } from "redux";
import { CurrentUserWithAuthToken, makeUserDTO } from "@paralogs/shared";
import { RootState, configureReduxStore } from "../../../reduxStore";
import {
  expectStateToMatch,
  getInMemoryDependencies,
  InMemoryDependencies,
} from "../../../testUtils";
import { feedWithCurrentUserCreator, feedWithErrorCreator } from "./auth.testUtils";
import { authActions } from "../auth.actions";

describe("Login", () => {
  let store: Store<RootState>;
  let dependencies: InMemoryDependencies; /* cannot be typed Dependencies because we need to access .currentUser$ */
  let feedWithCurrentUser: (params: CurrentUserWithAuthToken) => void;
  let feedWithError: (errorMessage: string) => void;

  beforeEach(() => {
    dependencies = getInMemoryDependencies();
    store = configureReduxStore(dependencies);
    feedWithCurrentUser = feedWithCurrentUserCreator(dependencies);
    feedWithError = feedWithErrorCreator(dependencies);
  });

  describe("Email and password are correct", () => {
    it("returns logged user with authentication token", () => {
      const email = "auth@works.com";
      const currentUser = makeUserDTO({ email });
      const password = "password";
      const token = "fakeLoginToken";
      loginUser({ email, password });
      feedWithCurrentUser({ currentUser, token });
      expectStateToMatch(store, {
        auth: {
          isLoading: false,
          currentUser,
          token,
        },
      });
      expectTokenToBeStoredInClientStorage(token);
    });
  });

  describe("When email or password is wrong", () => {
    it("refuses to log in with an explicit message", () => {
      const email = "already@used.com";
      const password = "wrongPassword";
      const errorMessage = "Email or password is incorrect...";
      loginUser({ email, password });
      feedWithError(errorMessage);
      expectStateToMatch(store, {
        auth: {
          isLoading: false,
          error: new Error(errorMessage),
          token: null,
          currentUser: null,
        },
      });
    });
  });

  const loginUser = ({ email, password }: { email: string; password: string }) =>
    store.dispatch(authActions.loginRequest({ email, password }));

  const expectTokenToBeStoredInClientStorage = (token: string) => {
    expect(dependencies.clientStorage.get("token")).toBe(token);
  };
});
