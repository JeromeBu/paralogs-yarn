import { getType } from "typesafe-actions";
import { ErrorFromAction, shouldNeverBeCalled } from "../../utils";
import { currentUserActions, CurrentUserAction } from "./currentUser.actions";

interface CurrentUserState {
  readonly isAuthenticated: boolean;
  readonly error?: ErrorFromAction;
  readonly isLoading: boolean;
}

const initialState: CurrentUserState = {
  isLoading: false,
  isAuthenticated: false,
};

export const currentUserReducer = (
  state: CurrentUserState = initialState,
  action: CurrentUserAction,
): CurrentUserState => {
  switch (action.type) {
    case getType(currentUserActions.getCurrentSession):
    case getType(currentUserActions.signUpRequest):
    case getType(currentUserActions.loginRequest):
    case getType(currentUserActions.loggout):
      return { ...state, isLoading: true };
    case getType(currentUserActions.loggoutSuccess):
      return { ...state, isLoading: false, isAuthenticated: false };
    case getType(currentUserActions.getCurrentSessionSuccess):
      return { ...state, isLoading: false, isAuthenticated: true, error: undefined };
    case getType(currentUserActions.signUpSuccess):
      return { ...state, isLoading: false, isAuthenticated: true, error: undefined };
    case getType(currentUserActions.loginSuccess):
      return { ...state, isLoading: false, isAuthenticated: true, error: undefined };
    case getType(currentUserActions.signUpError):
    case getType(currentUserActions.loginError):
    case getType(currentUserActions.loggoutError):
      return { ...state, error: action.payload, isLoading: false };
    case getType(currentUserActions.getCurrentSessionError):
      return state;
    default:
      shouldNeverBeCalled(action);
      return state;
  }
};
