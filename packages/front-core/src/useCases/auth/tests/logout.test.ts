import { Store } from "redux";
import { CurrentUserWithAuthToken, makeUserDTO } from "@paralogs/shared";
import { RootState, configureReduxStore } from "../../../reduxStore";
import {
  ExpectStateToMatch,
  expectStateToMatchCreator,
  getInMemoryDependencies,
  InMemoryDependencies,
} from "../../../testUtils";
import { feedWithCurrentUserCreator } from "./auth.testUtils";
import { authActions } from "../auth.slice";

describe("Logout", () => {
  let store: Store<RootState>;
  let dependencies: InMemoryDependencies;
  let feedWithCurrentUser: (params: CurrentUserWithAuthToken) => void;
  let expectStateToMatch: ExpectStateToMatch;

  beforeEach(() => {
    dependencies = getInMemoryDependencies();
    store = configureReduxStore(dependencies);
    feedWithCurrentUser = feedWithCurrentUserCreator(dependencies);
    expectStateToMatch = expectStateToMatchCreator(store.getState(), store);
  });

  it("Clears all user's information and authentications", () => {
    const email = "auth@works.com";
    const currentUser = makeUserDTO({ email });
    const password = "password";
    const token = "fakeLoginToken";
    loginUser({ email, password });
    feedWithCurrentUser({ currentUser, token });
    expectStateToMatch({
      auth: {
        isLoading: false,
        currentUser,
        token,
      },
    });
    logout();
    expectStateToMatch({
      auth: { isLoading: false, currentUser: null, token: null },
    });
    expectTokenToNotToBeInClientStorage();
  });

  const logout = () => store.dispatch(authActions.logoutRequested());

  const loginUser = ({ email, password }: { email: string; password: string }) =>
    store.dispatch(authActions.loginRequested({ email, password }));

  const expectTokenToNotToBeInClientStorage = () => {
    expect(dependencies.clientStorage.get("token")).toBe(null);
  };
});
