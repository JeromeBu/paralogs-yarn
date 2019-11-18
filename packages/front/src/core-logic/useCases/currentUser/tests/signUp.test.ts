import { Store } from "redux";

import { RootState, configureReduxStore } from "../../../reduxStore";
import {
  expectStateToMatch,
  InMemoryDependencies,
  getInMemoryDependencies,
} from "../../../testUtils";
import { currentUserActions } from "../currentUser.actions";
import { CurrentUserWithToken } from "../currentUser.types";

describe("Sign up", () => {
  let store: Store<RootState>;
  let dependencies: InMemoryDependencies; /* cannot be typed Dependencies because we need to access .currentUser$ */

  beforeEach(() => {
    dependencies = getInMemoryDependencies();
    store = configureReduxStore(dependencies);
  });

  describe("Sign up successfully", () => {
    it("retrieve user and his authentication info", () => {
      const email = "jerome@mail.com";
      const password = "lulu";
      const token = "someFakeToken";
      signUpUser({ email, password });
      feedWithUser({ email, token });
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

  describe("when email already exists", () => {
    it("refuses to sign up", () => {
      const email = "already@used.com";
      const password = "password";
      const errorMessage = "This email is already used, consider logging in instead";
      signUpUser({ email, password });
      feedWithError(errorMessage);
      expectStateToMatch(store, {
        currentUser: {
          isLoading: false,
          error: {
            message: errorMessage,
          },
        },
      });
    });
  });

  const signUpUser = ({ email, password }: { email: string; password: string }) =>
    store.dispatch(currentUserActions.signUpRequest({ email, password }));

  const feedWithUser = (currentUserWithToken: CurrentUserWithToken) =>
    dependencies.authGateway.currentUser$.next(currentUserWithToken);

  const feedWithError = (errorMessage: string) => {
    dependencies.authGateway.currentUser$.error(new Error(errorMessage));
  };
});
