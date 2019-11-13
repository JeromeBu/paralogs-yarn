import { Store, DeepPartial } from "redux";
import { RootState } from "./reduxStore";

export const expectStateToMatch = (store: Store, expectedState: DeepPartial<RootState>) =>
  expect(store.getState()).toMatchObject(expectedState);
