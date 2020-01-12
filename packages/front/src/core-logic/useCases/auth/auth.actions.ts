import { createStandardAction, ActionType } from "typesafe-actions";

import { SignUpParams, LoginParams, CurrentUserWithAuthToken } from "@paralogs/shared";
import { ErrorFromAction } from "../../utils";

export const authActions = {
  loggout: createStandardAction("LOGGOUT")(),
  loggoutSuccess: createStandardAction("LOGGOUT_SUCCESS")(),
  loggoutError: createStandardAction("LOGGOUT_ERROR")<ErrorFromAction>(),

  signUpRequest: createStandardAction("SIGN_UP_REQUEST")<SignUpParams>(),
  signUpSuccess: createStandardAction("SIGN_UP_SUCCESS")<CurrentUserWithAuthToken>(),
  signUpError: createStandardAction("SIGN_UP_ERROR")<ErrorFromAction>(),

  loginRequest: createStandardAction("LOGIN_REQUEST")<LoginParams>(),
  loginSuccess: createStandardAction("LOGIN_SUCCESS")<CurrentUserWithAuthToken>(),
  loginError: createStandardAction("LOGIN_ERROR")<ErrorFromAction>(),
};

export type AuthAction = ActionType<typeof authActions>;
