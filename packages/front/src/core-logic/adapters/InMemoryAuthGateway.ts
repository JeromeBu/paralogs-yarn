import { BehaviorSubject, of } from "rxjs";

import { CurrentUserWithToken } from "../useCases/currentUser/currentUser.types";
import { AuthGateway, AuthParams } from "../useCases/currentUser/port/AuthGateway";

export class InMemoryAuthGateway implements AuthGateway {
  private _currentUser$ = new BehaviorSubject<CurrentUserWithToken | null>(null);

  public getCurrentSession() {
    return of({ message: "In memory session, fake response" });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login(params: AuthParams) {
    return this._currentUser$;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  signUp(params: AuthParams) {
    return this._currentUser$;
  }

  public loggout() {
    return of();
  }

  get currentUser$() {
    return this._currentUser$;
  }
}
