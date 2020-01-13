import { RootState } from "../../core-logic/reduxStore";

export const authSelectors = {
  isAuthenticated: (state: RootState) => state.auth.currentUser !== null,
  error: (state: RootState) => state.auth.error,
};
