import { Observable } from "rxjs";
import { LoginParams, SignUpParams } from "@paralogs/shared";

export interface AuthGateway {
  login(params: LoginParams): Observable<unknown>;
  signUp(params: SignUpParams): Observable<unknown>;
  loggout(): Observable<unknown>;
  getCurrentSession(): Observable<unknown>;
  // getCurrentUser(userId: string): Observable<UserDTO | null>;
}
