import { Store } from "redux";
import { RootState, configureReduxStore } from "../../../reduxStore";
import {
  InMemoryDependencies,
  getInMemoryDependencies,
  expectStateToMatch,
} from "../../../testUtils";
import { currentUserActions } from "../currentUser.actions";

describe("Get current user's session", () => {
  let store: Store<RootState>;
  let dependencies: InMemoryDependencies; /* cannot be typed Dependencies because we need to access .currentUser$ */

  beforeEach(() => {
    dependencies = getInMemoryDependencies();
    store = configureReduxStore(dependencies);
  });

  describe("When the user is not logged in", () => {
    it("fails to recover the session and the user", () => {
      // const email = "auth@works.com";
      // const password = "password";
      // const token = "fakeLoginToken";
      getCurrentSession();
      feedWithNoSession();
      expectStateToMatch(store, {
        currentUser: {
          isLoading: false,
          isAuthenticated: false,
        },
      });
    });
  });

  const getCurrentSession = () => store.dispatch(currentUserActions.getCurrentSession());
  const feedWithNoSession = () => dependencies.authGateway.currentUser$.next(null);

  // const feedWithError = (errorMessage: string) => {
  //   dependencies.authGateway.currentUser$.error(new Error(errorMessage));
  // };
});
