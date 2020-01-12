import { LoginParams, SignUpParams, CurrentUserWithAuthToken } from "@paralogs/shared";
import { BehaviorSubject, of } from "rxjs";
import { AuthGateway } from "../useCases/auth/port/AuthGateway";

export class InMemoryAuthGateway implements AuthGateway {
  private _currentUserWithToken$ = new BehaviorSubject<CurrentUserWithAuthToken>(
    (null as unknown) as CurrentUserWithAuthToken,
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login(params: LoginParams) {
    return this._currentUserWithToken$;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  signUp(params: SignUpParams) {
    return this._currentUserWithToken$;
  }

  public loggout() {
    return of();
  }

  get currentUser$() {
    return this._currentUserWithToken$;
  }
}
