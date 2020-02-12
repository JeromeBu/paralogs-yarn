import { Store } from "redux";
import { RootState } from "./reduxStore";
import { InMemoryAuthGateway } from "./adapters/InMemoryAuthGateway";
import { InMemoryWingGateway } from "./adapters/InMemoryWingGateway";
import { InMemoryFlightGateway } from "./adapters/InMemoryFlightGateway";

type Partial2Levels<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<Partial<U>>
    : T[P] extends ReadonlyArray<infer U>
    ? ReadonlyArray<Partial<U>>
    : Partial<T[P]>;
};

export const expectStateToMatch = (
  store: Store,
  expectedState: Partial2Levels<RootState>,
) => expect(store.getState()).toMatchObject(expectedState);

export const getInMemoryDependencies = () => ({
  authGateway: new InMemoryAuthGateway(),
  wingGateway: new InMemoryWingGateway(),
  flightGateway: new InMemoryFlightGateway(),
});

export type InMemoryDependencies = ReturnType<typeof getInMemoryDependencies>;
