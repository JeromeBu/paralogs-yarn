import { Store } from "redux";
import { makeUserDTO } from "@paralogs/shared";
import { configureReduxStore, RootState } from "../../../reduxStore";
import {
  ExpectStateToMatch,
  expectStateToMatchCreator,
  getInMemoryDependencies,
  InMemoryDependencies,
} from "../../../testUtils";
import { authActions } from "../auth.slice";

describe("update user ", () => {
  let store: Store<RootState>;
  let dependencies: InMemoryDependencies;
  let expectStateToMatch: ExpectStateToMatch;

  beforeEach(() => {
    dependencies = getInMemoryDependencies();
    store = configureReduxStore(dependencies);
    expectStateToMatch = expectStateToMatchCreator(store.getState(), store);
  });

  describe("when all is good", () => {
    it("updates the user with the provided data", async () => {
      const currentUser = makeUserDTO();
      const token = "someFakeToken";

      store.dispatch(authActions.authenticationSucceeded({ currentUser, token }));

      const updateParams = {
        firstName: "NewFirstName",
        lastName: "NewLastName",
      };

      store.dispatch(authActions.updateUserRequested(updateParams));

      expectStateToMatch({ auth: { currentUser: { ...currentUser, ...updateParams } } });
    });
  });
});
