import { LoginParams, SignUpParams } from "@paralogs/shared";
import { AuthGateway } from "../useCases/auth/port/AuthGateway";
import { httpClient } from "./libs/httpClient";

export class HttpAuthGateway implements AuthGateway {
  public login(params: LoginParams) {
    return httpClient.login(params);
  }

  public signUp(params: SignUpParams) {
    return httpClient.signUp(params);
  }

  public getMe() {
    return httpClient.getMe();
  }
}
