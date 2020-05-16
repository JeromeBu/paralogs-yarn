import {
  CurrentUserWithPilotWithAuthToken,
  makePilotDTO,
  makeUserDTO,
} from "@paralogs/shared";
import { Store } from "redux";

import { configureReduxStore, RootState } from "../../../reduxStore";
import {
  ExpectStateToMatch,
  expectStateToMatchCreator,
  getInMemoryDependencies,
  InMemoryDependencies,
} from "../../../testUtils";
import { authActions } from "../auth.slice";
import { feedWithCurrentUserCreator } from "./auth.testUtils";

describe("Logout", () => {
  let store: Store<RootState>;
  let dependencies: InMemoryDependencies;
  let feedWithCurrentUser: (params: CurrentUserWithPilotWithAuthToken) => void;
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
    const pilotInformation = makePilotDTO();
    const password = "password";
    const token = "fakeLoginToken";
    loginUser({ email, password });
    feedWithCurrentUser({ currentUser, pilotInformation, token });
    expectStateToMatch({
      auth: {
        isLoading: false,
        currentUser,
        token,
      },
      pilot: { pilotInformation },
    });
    logout();
    expectStateToMatch({
      auth: { isLoading: false, currentUser: null, token: null },
      pilot: { pilotInformation: null },
    });
    expectTokenToNotToBeInClientStorage();
  });

  const logout = () => store.dispatch(authActions.logoutRequested());

  const loginUser = ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => store.dispatch(authActions.loginRequested({ email, password }));

  const expectTokenToNotToBeInClientStorage = () => {
    expect(dependencies.clientStorage.get("token")).toBe(null);
  };
});
