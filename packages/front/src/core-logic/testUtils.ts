import { Store, DeepPartial } from "redux";
import { RootState } from "./reduxStore";
import { InMemoryAPIGateway } from "./adapters/InMemoryAPIGateway";
import { InMemoryWingGateway } from "./adapters/InMemoryWingGateway";

export const expectStateToMatch = (store: Store, expectedState: DeepPartial<RootState>) =>
  expect(store.getState()).toMatchObject(expectedState);

export const getInMemoryDependencies = () => ({
  apiGateway: new InMemoryAPIGateway(),
  wingGateway: new InMemoryWingGateway(),
});

export type InMemoryDependencies = ReturnType<typeof getInMemoryDependencies>;
