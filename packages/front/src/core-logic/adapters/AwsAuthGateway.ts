import { Auth } from "aws-amplify";
import { from } from "rxjs";

import { AuthGateway, AuthParams } from "../useCases/currentUser/port/AuthGateway";

export class AwsAuthGateway implements AuthGateway {
  public getCurrentSession() {
    return from(Auth.currentSession());
  }

  public login(params: AuthParams) {
    const { email, password } = params;
    return from(Auth.signIn(email, password));
  }

  public signUp(params: AuthParams) {
    const { email, password } = params;
    return from(Auth.signUp({ username: email, password }));
  }

  public loggout() {
    return from(Auth.signOut());
  }
}
