import { Store } from "redux";
import { RootState } from "./reduxStore";
import { InMemoryAuthGateway } from "./adapters/InMemoryAuthGateway";
import { InMemoryWingGateway } from "./adapters/InMemoryWingGateway";
import { InMemoryFlightGateway } from "./adapters/InMemoryFlightGateway";
import { InMemoryClientStorage } from "./adapters/InMemoryClientStorage";

type Partial2Levels<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<Partial<U>>
    : T[P] extends ReadonlyArray<infer U>
    ? ReadonlyArray<Partial<U>>
    : Partial<T[P]>;
};

export const expectStateToMatchCreator = (initialState: RootState, store: Store) => (
  expectedState: Partial2Levels<RootState>,
) => expect(store.getState()).toMatchObject({ ...initialState, ...expectedState });

export type ExpectStateToMatch = ReturnType<typeof expectStateToMatchCreator>;

export const getInMemoryDependencies = () => ({
  authGateway: new InMemoryAuthGateway(),
  wingGateway: new InMemoryWingGateway(),
  flightGateway: new InMemoryFlightGateway(),
  clientStorage: new InMemoryClientStorage(),
});

export type InMemoryDependencies = ReturnType<typeof getInMemoryDependencies>;
