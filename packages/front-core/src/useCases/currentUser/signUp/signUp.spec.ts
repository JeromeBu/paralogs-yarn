import { Store } from "redux";

import { RootState, configureReduxStore } from "../../../reduxStore";
import { InMemoryAPIGateway } from "../../../adapters/InMemoryAPIGateway";
import { expectStateToMatch } from "../../../testUtils";
import { currentUserActions } from "../currentUser.actions";
import { CurrentUserWithToken } from "../currentUser.types";

describe("Sign up", () => {
  let store: Store<RootState>;
  let apiGateway: InMemoryAPIGateway; /* cannot be typed APIGateway because we need to access .flights$ */

  beforeEach(() => {
    apiGateway = new InMemoryAPIGateway();
    store = configureReduxStore({ apiGateway });
  });

  describe("Sign up successfully", () => {
    it("retrieve user and his authentication info", () => {
      const email = "jerome@mail.com";
      const password = "lulu";
      const token = "someFakeToken";
      signUpUser({ email, password });
      feedWithCreatedUser({ email, token });
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

  const feedWithCreatedUser = (currentUserWithToken: CurrentUserWithToken) =>
    apiGateway.currentUser$.next(currentUserWithToken);

  const feedWithError = (errorMessage: string) => {
    apiGateway.currentUser$.error(new Error(errorMessage));
  };
});
