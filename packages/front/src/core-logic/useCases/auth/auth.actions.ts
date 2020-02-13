import { createStandardAction, ActionType } from "typesafe-actions";

import { SignUpParams, LoginParams, CurrentUserWithAuthToken } from "@paralogs/shared";
import { ErrorFromAction } from "../../utils";

export const authActions = {
  logout: createStandardAction("LOGGOUT")(),
  // logoutSuccess: createStandardAction("LOGGOUT_SUCCEEDED")(),

  signUpRequest: createStandardAction("SIGN_UP_REQUESTED")<SignUpParams>(),
  signUpSuccess: createStandardAction("SIGN_UP_SUCCEEDED")<CurrentUserWithAuthToken>(),
  signUpError: createStandardAction("SIGN_UP_FAILD")<ErrorFromAction>(),

  loginRequest: createStandardAction("LOGIN_REQUESTED")<LoginParams>(),
  loginSuccess: createStandardAction("LOGIN_SUCCEEDED")<CurrentUserWithAuthToken>(),
  loginError: createStandardAction("LOGIN_FAILD")<ErrorFromAction>(),
};

export type AuthAction = ActionType<typeof authActions>;
