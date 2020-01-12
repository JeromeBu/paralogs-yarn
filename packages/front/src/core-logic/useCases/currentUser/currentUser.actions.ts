import { createStandardAction, ActionType } from "typesafe-actions";

import { SignUpParams, LoginParams } from "@paralogs/shared";
import { ErrorFromAction } from "../../utils";

export const currentUserActions = {
  getCurrentSession: createStandardAction("GET_CURRENT_SESSION")(),
  getCurrentSessionSuccess: createStandardAction("GET_CURRENT_SESSION_SUCCESS")(),
  getCurrentSessionError: createStandardAction("GET_CURRENT_SESSION_ERROR")<
    ErrorFromAction
  >(),

  loggout: createStandardAction("LOGGOUT")(),
  loggoutSuccess: createStandardAction("LOGGOUT_SUCCESS")(),
  loggoutError: createStandardAction("LOGGOUT_ERROR")<ErrorFromAction>(),

  signUpRequest: createStandardAction("SIGN_UP_REQUEST")<SignUpParams>(),
  signUpSuccess: createStandardAction("SIGN_UP_SUCCESS")<unknown>(),
  signUpError: createStandardAction("SIGN_UP_ERROR")<ErrorFromAction>(),

  loginRequest: createStandardAction("LOGIN_REQUEST")<LoginParams>(),
  loginSuccess: createStandardAction("LOGIN_SUCCESS")<unknown>(),
  loginError: createStandardAction("LOGIN_ERROR")<ErrorFromAction>(),
};

export type CurrentUserAction = ActionType<typeof currentUserActions>;
