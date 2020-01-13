import { LoginParams, SignUpParams } from "@paralogs/shared";
import { AuthGateway } from "../useCases/auth/port/AuthGateway";
import { httpClient } from "./libs/httpClient";

export class AwsAuthGateway implements AuthGateway {
  public login(params: LoginParams) {
    return httpClient.logIn(params);
  }

  public signUp(params: SignUpParams) {
    return httpClient.signUp(params);
  }

  public logout() {
    return httpClient.logout();
  }
}
