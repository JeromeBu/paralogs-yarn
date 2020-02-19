import { RootState } from "../../core-logic/reduxStore";

export const authSelectors = {
  isAuthenticated: (state: RootState) => state.auth.token !== null,
  error: (state: RootState) => state.auth.error,
};
