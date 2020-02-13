import { getType } from "typesafe-actions";
import { UserDTO } from "@paralogs/shared";
import { ErrorFromAction, shouldNeverBeCalled } from "../../utils";
import { AuthAction, authActions } from "./auth.actions";

interface AuthState {
  readonly error?: ErrorFromAction;
  readonly isLoading: boolean;
  readonly currentUser: UserDTO | null;
  readonly token: string | null;
}

const initialState: AuthState = {
  isLoading: false,
  currentUser: null,
  token: null,
};

export const authReducer = (
  state: AuthState = initialState,
  action: AuthAction,
): AuthState => {
  switch (action.type) {
    case getType(authActions.signUpRequest):
    case getType(authActions.loginRequest):
    case getType(authActions.logout):
      return { ...state, isLoading: false, currentUser: null, token: null };
    // replace by : when logout epic is cleared...
    // case getType(authActions.logout):
    //   return { ...state, isLoading: true };
    // case getType(authActions.logoutSuccess):
    //   return { ...state, isLoading: false, currentUser: null, token: null };
    case getType(authActions.signUpSuccess):
    case getType(authActions.loginSuccess):
      const { currentUser, token } = action.payload;
      return { ...state, isLoading: false, currentUser, token, error: undefined };
    case getType(authActions.signUpError):
    case getType(authActions.loginError):
      return { ...state, error: action.payload, isLoading: false };
    default:
      shouldNeverBeCalled(action);
      return state;
  }
};
