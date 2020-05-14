import {
  CurrentUserWithPilotWithAuthToken,
  LoginParams,
  SignUpParams,
} from "@paralogs/shared";
import { Observable } from "rxjs";

export interface AuthGateway {
  login(params: LoginParams): Observable<CurrentUserWithPilotWithAuthToken>;
  signUp(params: SignUpParams): Observable<CurrentUserWithPilotWithAuthToken>;
  getMe(): Observable<CurrentUserWithPilotWithAuthToken>;
}
