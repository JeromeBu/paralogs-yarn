import { Store } from "redux";
import { CurrentUserWithAuthToken, SignUpParams, makeUserDTO } from "@paralogs/shared";
import { RootState, configureReduxStore } from "../../../reduxStore";
import {
  expectStateToMatch,
  InMemoryDependencies,
  getInMemoryDependencies,
} from "../../../testUtils";
import { feedWithCurrentUserCreator, feedWithAuthErrorCreator } from "./auth.testUtils";
import { authActions } from "../auth.actions";

describe("Sign up", () => {
  let store: Store<RootState>;
  let dependencies: InMemoryDependencies; /* cannot be typed Dependencies because we need to access .currentUser$ */
  let feedWithCurrentUser: (params: CurrentUserWithAuthToken) => void;
  let feedWithError: (errorMessage: string) => void;

  beforeEach(() => {
    dependencies = getInMemoryDependencies();
    store = configureReduxStore(dependencies);
    feedWithCurrentUser = feedWithCurrentUserCreator(dependencies);
    feedWithError = feedWithAuthErrorCreator(dependencies);
  });

  describe("Sign up successfully", () => {
    it("retrieve user and his authentication info", () => {
      const email = "jerome@mail.com";
      const password = "password";
      const firstName = "John";
      const lastName = "Doe";

      const currentUser = makeUserDTO({ email, firstName, lastName });
      const token = "someFakeToken";

      signUpUser({ email, password, firstName, lastName });
      feedWithCurrentUser({ currentUser, token });
      expectStateToMatch(store, {
        auth: {
          currentUser,
          isLoading: false,
          token,
        },
      });
      expectTokenToBeStoredInClientStorage(token);
    });
  });

  describe("when email already exists", () => {
    it("refuses to sign up", () => {
      const email = "jerome@mail.com";
      const password = "password";
      const firstName = "John";
      const lastName = "Doe";

      const errorMessage = "This email is already used, consider logging in instead";

      signUpUser({ email, password, firstName, lastName });
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

  const signUpUser = (signUpParams: SignUpParams) => {
    store.dispatch(authActions.signUpRequest(signUpParams));
  };

  const expectTokenToBeStoredInClientStorage = (token: string) => {
    expect(dependencies.clientStorage.get("token")).toBe(token);
  };
});
