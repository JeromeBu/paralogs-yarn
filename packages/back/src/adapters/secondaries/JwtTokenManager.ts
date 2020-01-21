import jwt from "jsonwebtoken";
import { TokenManager } from "../../domain/port/TokenManager";

export class JwtTokenManager implements TokenManager {
  generate(params: { userId: string }) {
    return jwt.sign(params, "TODO: change Secret");
  }
}
