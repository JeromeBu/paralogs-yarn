import { Auth /* API */ } from "aws-amplify";
import { from } from "rxjs";

import { AuthGateway, AuthParams } from "../useCases/currentUser/port/AuthGateway";

export class AwsAuthGateway implements AuthGateway {
  public getCurrentSession() {
    return from(Auth.currentSession());
  }

  public login(params: AuthParams) {
    const { email, password } = params;
    // eslint-disable-next-line no-console
    console.log("SIGN IN", { email, password });

    return from(Auth.signIn(email, password));
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public signUp(params: AuthParams) {
    const { email, password } = params;
    // eslint-disable-next-line no-console
    console.log("SIGN UP", { email, password });

    return from(Auth.signUp({ username: email, password }));
  }

  public loggout() {
    return from(Auth.signOut());
  }
}
