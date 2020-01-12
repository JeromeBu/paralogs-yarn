import { UserDTO, LoginParams, SignUpParams } from "@paralogs/shared";
import { BehaviorSubject, of } from "rxjs";
import { AuthGateway } from "../useCases/currentUser/port/AuthGateway";

export class InMemoryAuthGateway implements AuthGateway {
  private _currentUser$ = new BehaviorSubject<UserDTO | null>(null);

  public getCurrentSession() {
    return of(this._currentUser$.value?.id ?? null);
  }

  // // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // public getCurrentUser(userId: string) {
  //   return this._currentUser$;
  // }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login(params: LoginParams) {
    return this._currentUser$;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  signUp(params: SignUpParams) {
    return this._currentUser$;
  }

  public loggout() {
    return of();
  }

  get currentUser$() {
    return this._currentUser$;
  }
}
