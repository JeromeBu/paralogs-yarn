import { Observable } from "rxjs";

import { CurrentUserWithToken } from "../currentUser.types";

export interface AuthParams {
  email: string;
  password: string;
}

export interface AuthGateway {
  login(params: AuthParams): Observable<CurrentUserWithToken | null>;
  signUp(params: AuthParams): Observable<CurrentUserWithToken | null>;
  loggout(): Observable<unknown>;
  getCurrentSession(): Observable<unknown>;
}
