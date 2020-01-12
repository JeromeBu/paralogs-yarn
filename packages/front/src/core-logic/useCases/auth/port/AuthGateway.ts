import { Observable } from "rxjs";
import { LoginParams, SignUpParams, CurrentUserWithAuthToken } from "@paralogs/shared";

export interface AuthGateway {
  login(params: LoginParams): Observable<CurrentUserWithAuthToken>;
  signUp(params: SignUpParams): Observable<CurrentUserWithAuthToken>;
  loggout(): Observable<unknown>;
}
