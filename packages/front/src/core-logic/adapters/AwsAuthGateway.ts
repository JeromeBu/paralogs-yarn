import { Auth } from "aws-amplify";
import { from } from "rxjs";

import {
  AuthGateway,
  LoginParams,
  SignUpParams,
} from "../useCases/currentUser/port/AuthGateway";

export class AwsAuthGateway implements AuthGateway {
  public getCurrentSession() {
    return from(Auth.currentSession());
  }

  public login(params: LoginParams) {
    const { email, password } = params;
    return from(Auth.signIn(email, password));
  }

  public signUp(params: SignUpParams) {
    const { email, password } = params;
    return from(Auth.signUp({ username: email, password }));
  }

  public loggout() {
    return from(Auth.signOut());
  }
}
