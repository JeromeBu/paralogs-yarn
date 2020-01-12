import { from } from "rxjs";
import { LoginParams, SignUpParams } from "@paralogs/shared";
import { AuthGateway } from "../useCases/auth/port/AuthGateway";
import { httpClient } from "./libs/httpClient";

export class AwsAuthGateway implements AuthGateway {
  public login(params: LoginParams) {
    return from(httpClient.logIn(params));
  }

  public signUp(params: SignUpParams) {
    return from(httpClient.signUp(params));
  }

  public loggout() {
    return from(httpClient.loggout());
  }
}
