import { ActionType, getType } from "typesafe-actions";
import { CurrentUserWithToken } from "./currentUser.types";
import { ErrorFromAction, shouldNeverBeCalled } from "../../utils";
import { currentUserActions } from "./currentUser.actions";

interface CurrentUserState {
  readonly data?: CurrentUserWithToken | null;
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
  action: ActionType<typeof currentUserActions>,
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
      return { ...state, isLoading: false, isAuthenticated: true };
    case getType(currentUserActions.signUpSuccess):
      return { ...state, data: action.payload, isLoading: false };
    case getType(currentUserActions.loginSuccess):
      return { ...state, data: action.payload, isLoading: false, isAuthenticated: true };
    case getType(currentUserActions.getCurrentSessionError):
    case getType(currentUserActions.signUpError):
    case getType(currentUserActions.loginError):
    case getType(currentUserActions.loggoutError):
      return { ...state, error: action.payload, isLoading: false };
    default:
      if (
        Object.values(currentUserActions)
          .map(getType)
          // eslint-disable-next-line dot-notation
          .includes(action["type"])
      ) {
        shouldNeverBeCalled(action);
      }
      return state;
  }
};
