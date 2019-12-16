import { Observable } from "rxjs";

export interface LoginParams {
  email: string;
  password: string;
}

export interface SignUpParams extends LoginParams {
  firstName: string;
  lastName: string;
}

export interface AuthGateway {
  login(params: LoginParams): Observable<unknown>;
  signUp(params: SignUpParams): Observable<unknown>;
  loggout(): Observable<unknown>;
  getCurrentSession(): Observable<unknown>;
}
