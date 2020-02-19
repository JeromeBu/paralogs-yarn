import { Store } from "redux";
import { CurrentUserWithAuthToken, makeUserDTO } from "@paralogs/shared";
import { RootState, configureReduxStore } from "../../../reduxStore";
import {
  expectStateToMatch,
  getInMemoryDependencies,
  InMemoryDependencies,
} from "../../../testUtils";
import { feedWithCurrentUserCreator } from "./auth.testUtils";
import { authActions } from "../auth.actions";

describe("Logout", () => {
  let store: Store<RootState>;
  let dependencies: InMemoryDependencies; /* cannot be typed Dependencies because we need to access .currentUser$ */
  let feedWithCurrentUser: (params: CurrentUserWithAuthToken) => void;

  beforeEach(() => {
    dependencies = getInMemoryDependencies();
    store = configureReduxStore(dependencies);
    feedWithCurrentUser = feedWithCurrentUserCreator(dependencies);
  });

  it("Clears all user's informations and authentications", () => {
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
    logout();
    expectStateToMatch(store, {
      auth: { isLoading: false, currentUser: null, token: null },
    });
    expectTokenToNotToBeInClientStorage();
  });

  const logout = () => store.dispatch(authActions.logout());

  const loginUser = ({ email, password }: { email: string; password: string }) =>
    store.dispatch(authActions.loginRequest({ email, password }));

  const expectTokenToNotToBeInClientStorage = () => {
    expect(dependencies.clientStorage.get("token")).toBe(null);
  };
});
