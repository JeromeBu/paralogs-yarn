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
import {
  feedWithAuthErrorCreator,
  feedWithCurrentUserCreator,
} from "./auth.testUtils";

describe("GetMe :  recover current user information", () => {
  let store: Store<RootState>;
  let dependencies: InMemoryDependencies;
  let feedWithCurrentUser: (params: CurrentUserWithPilotWithAuthToken) => void;
  let feedWithError: (errorMessage: string) => void;
  let expectStateToMatch: ExpectStateToMatch;

  beforeEach(() => {
    dependencies = getInMemoryDependencies();
    store = configureReduxStore(dependencies);
    feedWithError = feedWithAuthErrorCreator(dependencies);
    feedWithCurrentUser = feedWithCurrentUserCreator(dependencies);
    expectStateToMatch = expectStateToMatchCreator(store.getState(), store);
  });

  describe("No one is logged in", () => {
    it("warns the user with a message", () => {
      const errorMessage = "You need to authenticate first";

      getMe();
      feedWithError(errorMessage);
      expectStateToMatch({
        auth: {
          error: errorMessage,
          token: null,
          isLoading: false,
        },
      });
    });
  });

  describe("You are logged in", () => {
    it("recovers current user information", () => {
      const currentUser = makeUserDTO();
      const pilotInformation = makePilotDTO();
      const token = "someFakeToken";
      getMe();
      feedWithCurrentUser({
        currentUser,
        pilotInformation,
        token,
      });
      expectStateToMatch({
        auth: {
          currentUser,
          token,
        },
        pilot: { pilotInformation },
      });
      expect(dependencies.clientStorage.get("token")).toBe(token);
    });
  });

  const getMe = () => store.dispatch(authActions.getMeRequested());
});
