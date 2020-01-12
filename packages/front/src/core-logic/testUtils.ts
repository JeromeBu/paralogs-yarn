import { Store, DeepPartial } from "redux";
import { CurrentUserWithAuthToken } from "@paralogs/shared";
import { RootState } from "./reduxStore";
import { InMemoryAuthGateway } from "./adapters/InMemoryAuthGateway";
import { InMemoryWingGateway } from "./adapters/InMemoryWingGateway";
import { InMemoryFlightGateway } from "./adapters/InMemoryFlightGateway";

export const expectStateToMatch = (store: Store, expectedState: DeepPartial<RootState>) =>
  expect(store.getState()).toMatchObject(expectedState);

export const getInMemoryDependencies = () => ({
  authGateway: new InMemoryAuthGateway(),
  wingGateway: new InMemoryWingGateway(),
  flightGateway: new InMemoryFlightGateway(),
});

export type InMemoryDependencies = ReturnType<typeof getInMemoryDependencies>;

export const feedWithCurrentUserCreator = (dependencies: InMemoryDependencies) => (
  userDTOWithAuthToken: CurrentUserWithAuthToken,
) => dependencies.authGateway.currentUser$.next(userDTOWithAuthToken);

export const feedWithErrorCreator = (dependencies: InMemoryDependencies) => (
  errorMessage: string,
) => {
  dependencies.authGateway.currentUser$.error(new Error(errorMessage));
};
