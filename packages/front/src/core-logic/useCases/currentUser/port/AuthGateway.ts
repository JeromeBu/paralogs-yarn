import { Observable } from "rxjs";

export interface AuthParams {
  email: string;
  password: string;
}

export interface AuthGateway {
  login(params: AuthParams): Observable<unknown>;
  signUp(params: AuthParams): Observable<unknown>;
  loggout(): Observable<unknown>;
  getCurrentSession(): Observable<unknown>;
}
