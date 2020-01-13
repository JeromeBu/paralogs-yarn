import { Store, DeepPartial } from "redux";
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
