import { Store } from "redux";
import {
  CurrentUserWithAuthToken,
  SignUpParams,
  makeUserDTO,
  makePilotDTO,
} from "@paralogs/shared";
import { RootState, configureReduxStore } from "../../../reduxStore";
import {
  expectStateToMatchCreator,
  InMemoryDependencies,
  getInMemoryDependencies,
  ExpectStateToMatch,
} from "../../../testUtils";
import { feedWithCurrentUserCreator, feedWithAuthErrorCreator } from "./auth.testUtils";
import { authActions } from "../auth.slice";

describe("Sign up", () => {
  let store: Store<RootState>;
  let dependencies: InMemoryDependencies; /* cannot be typed Dependencies because we need to access .currentUser$ */
  let feedWithCurrentUser: (params: CurrentUserWithAuthToken) => void;
  let feedWithError: (errorMessage: string) => void;
  let expectStateToMatch: ExpectStateToMatch;

  beforeEach(() => {
    dependencies = getInMemoryDependencies();
    store = configureReduxStore(dependencies);
    feedWithCurrentUser = feedWithCurrentUserCreator(dependencies);
    feedWithError = feedWithAuthErrorCreator(dependencies);
    expectStateToMatch = expectStateToMatchCreator(store.getState(), store);
  });

  describe("Sign up successfully", () => {
    it("retrieve user and his authentication info", () => {
      const email = "jerome@mail.com";
      const password = "password";
      const firstName = "John";
      const lastName = "Doe";

      const currentUser = makeUserDTO({ email });
      const pilotInformation = makePilotDTO({ firstName, lastName });
      const token = "someFakeToken";

      signUpUser({ email, password, firstName, lastName });
      feedWithCurrentUser({ currentUser, pilotInformation, token });
      expectStateToMatch({
        auth: {
          currentUser,
          isLoading: false,
          token,
        },
        pilot: {
          pilotInformation,
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
      expectStateToMatch({
        auth: {
          isLoading: false,
          error: errorMessage,
          token: null,
          currentUser: null,
        },
      });
    });
  });

  const signUpUser = (signUpParams: SignUpParams) => {
    store.dispatch(authActions.signUpRequested(signUpParams));
  };

  const expectTokenToBeStoredInClientStorage = (token: string) => {
    expect(dependencies.clientStorage.get("token")).toBe(token);
  };
});
