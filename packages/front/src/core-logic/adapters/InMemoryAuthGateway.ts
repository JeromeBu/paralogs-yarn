import { LoginParams, SignUpParams, CurrentUserWithAuthToken } from "@paralogs/shared";
import { BehaviorSubject, of } from "rxjs";
import { filter } from "rxjs/operators";
import { AuthGateway } from "../useCases/auth/port/AuthGateway";

export class InMemoryAuthGateway implements AuthGateway {
  private _currentUserWithToken$ = new BehaviorSubject<CurrentUserWithAuthToken>(
    (undefined as unknown) as CurrentUserWithAuthToken,
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public login(params: LoginParams) {
    return this._currentUserWithToken$.pipe(filter(val => val !== undefined));
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public signUp(params: SignUpParams) {
    return this._currentUserWithToken$.pipe(filter(val => val !== undefined));
  }

  public logout() {
    return of();
  }

  get currentUserWithToken$() {
    return this._currentUserWithToken$;
  }
}
