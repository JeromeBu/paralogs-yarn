import { Store } from "redux";
import { CurrentUserWithAuthToken, SignUpParams } from "@paralogs/shared";
import { RootState, configureReduxStore } from "../../../reduxStore";
import {
  expectStateToMatch,
  InMemoryDependencies,
  getInMemoryDependencies,
  feedWithCurrentUserCreator,
  feedWithErrorCreator,
} from "../../../testUtils";
import { authActions } from "../auth.actions";
import { makeUserDTO } from "./userBuilder";

describe("Sign up", () => {
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

  describe("Sign up successfully", () => {
    it("retrieve user and his authentication info", () => {
      const { email, firstName, lastName } = signUpUser();
      const token = "someFakeToken";
      const currentUser = makeUserDTO({ email, firstName, lastName });
      feedWithCurrentUser({ currentUser, token });
      expectStateToMatch(store, {
        auth: {
          currentUser,
          isLoading: false,
          token,
        },
      });
    });
  });

  describe("when email already exists", () => {
    it("refuses to sign up", () => {
      const errorMessage = "This email is already used, consider logging in instead";
      signUpUser();
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

  const signUpUser = (): SignUpParams => {
    const email = "jerome@mail.com";
    const password = "password";
    const firstName = "John";
    const lastName = "Doe";
    const signUpParams = { email, password, firstName, lastName };
    store.dispatch(authActions.signUpRequest(signUpParams));
    return signUpParams;
  };
});
