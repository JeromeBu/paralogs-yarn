import { Observable } from "rxjs";
import {
  LoginParams,
  SignUpParams,
  CurrentUserWithAuthToken,
  UpdateUserDTO,
} from "@paralogs/shared";

export interface AuthGateway {
  login(params: LoginParams): Observable<CurrentUserWithAuthToken>;
  signUp(params: SignUpParams): Observable<CurrentUserWithAuthToken>;
  getMe(): Observable<CurrentUserWithAuthToken>;
  updateUser(params: UpdateUserDTO): Observable<void>;
}
