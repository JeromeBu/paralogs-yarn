import { API } from "aws-amplify";
import {
  LoginParams,
  SignUpParams,
  WingDTO,
  CurrentUserWithAuthToken,
  UserDTO,
} from "@paralogs/shared";

const signUp = (signUpParams: SignUpParams): Promise<CurrentUserWithAuthToken> =>
  API.post("users", "/signup", { body: signUpParams });

const logIn = (logInParams: LoginParams): Promise<CurrentUserWithAuthToken> =>
  API.post("users", "/login", { body: logInParams });

const loggout = (): Promise<void> => API.get("users", "/loggout", null);

const retrieveUsers = (): Promise<UserDTO[]> => API.get("users", "users", null);

const retrieveWings = (): Promise<WingDTO[]> => API.get("wings", "wings", null);

export const httpClient = {
  signUp,
  logIn,
  loggout,
  retrieveWings,
  retrieveUsers,
};
