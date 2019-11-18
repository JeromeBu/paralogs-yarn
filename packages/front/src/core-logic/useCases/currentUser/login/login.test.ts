import { Store } from "redux";
import { RootState, configureReduxStore } from "../../../reduxStore";
import {
  expectStateToMatch,
  getInMemoryDependencies,
  InMemoryDependencies,
} from "../../../testUtils";
import { currentUserActions } from "../currentUser.actions";
import { CurrentUserWithToken } from "../currentUser.types";

describe("Login", () => {
  let store: Store<RootState>;
  let dependencies: InMemoryDependencies; /* cannot be typed Dependencies because we need to access .currentUser$ */

  beforeEach(() => {
    dependencies = getInMemoryDependencies();
    store = configureReduxStore(dependencies);
  });

  describe("Email and password are correct", () => {
    it("returns logged user with authentication token", () => {
      const email = "auth@works.com";
      const password = "password";
      const token = "fakeLoginToken";
      loginUser({ email, password });
      feedWithLoggedUser({ email, token });
      expectStateToMatch(store, {
        currentUser: {
          data: {
            email,
            token,
          },
          isLoading: false,
        },
      });
    });
  });

  describe("When email or password is wrong", () => {
    it("refuses to sign up with an explicit message", () => {
      const email = "already@used.com";
      const password = "wrongPassword";
      const errorMessage = "Email or passport is incorrect...";
      loginUser({ email, password });
      feedWithError(errorMessage);
      expectStateToMatch(store, {
        currentUser: {
          isLoading: false,
          error: { message: errorMessage },
        },
      });
    });
  });

  const loginUser = ({ email, password }: { email: string; password: string }) =>
    store.dispatch(currentUserActions.loginRequest({ email, password }));

  const feedWithLoggedUser = (currentUser: CurrentUserWithToken) =>
    dependencies.apiGateway.currentUser$.next(currentUser);

  const feedWithError = (errorMessage: string) => {
    dependencies.apiGateway.currentUser$.error(new Error(errorMessage));
  };
});
