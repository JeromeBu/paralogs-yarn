import { Auth /* API */ } from "aws-amplify";
import { BehaviorSubject, of, from } from "rxjs";

import { CurrentUserWithToken } from "../useCases/currentUser/currentUser.types";
import { AuthGateway, AuthParams } from "../useCases/currentUser/port/AuthGateway";

export class AwsAuthGateway implements AuthGateway {
  private _currentUser$ = new BehaviorSubject<CurrentUserWithToken | null>(null);

  public getCurrentSession() {
    try {
      return from(Auth.currentSession());
    } catch (e) {
      if (e !== "No current user") {
        // eslint-disable-next-line no-console
        console.log(e);
      }
      return of({ message: "No current user" });
    }
  }

  public login(params: AuthParams) {
    const { email, password } = params;
    // eslint-disable-next-line no-console
    console.log({ email, password });

    try {
      Auth.signIn(email, password)
        .then(response => {
          // eslint-disable-next-line no-console
          console.log({ response });
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.log("error on loggin : ", { error });
        });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error.message);
    }
    this._currentUser$.next({ email, token: "some fake token" });
    return this._currentUser$;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public signUp(params: AuthParams) {
    return this._currentUser$;
  }

  public loggout() {
    return from(Auth.signOut());
  }
}
