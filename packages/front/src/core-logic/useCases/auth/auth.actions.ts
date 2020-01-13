import { createStandardAction, ActionType } from "typesafe-actions";

import { SignUpParams, LoginParams, CurrentUserWithAuthToken } from "@paralogs/shared";
import { ErrorFromAction } from "../../utils";

export const authActions = {
  loggout: createStandardAction("LOGGOUT_REQUESTED")(),
  loggoutSuccess: createStandardAction("LOGGOUT_SUCCEEDED")(),
  loggoutError: createStandardAction("LOGGOUT_FAILD")<ErrorFromAction>(),

  signUpRequest: createStandardAction("SIGN_UP_REQUESTED")<SignUpParams>(),
  signUpSuccess: createStandardAction("SIGN_UP_SUCCEEDED")<CurrentUserWithAuthToken>(),
  signUpError: createStandardAction("SIGN_UP_FAILD")<ErrorFromAction>(),

  loginRequest: createStandardAction("LOGIN_REQUESTED")<LoginParams>(),
  loginSuccess: createStandardAction("LOGIN_SUCCEEDED")<CurrentUserWithAuthToken>(),
  loginError: createStandardAction("LOGIN_FAILD")<ErrorFromAction>(),
};

export type AuthAction = ActionType<typeof authActions>;
