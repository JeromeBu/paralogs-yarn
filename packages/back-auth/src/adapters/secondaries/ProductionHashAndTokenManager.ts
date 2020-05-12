import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { WithUserUuid } from "@paralogs/shared";
import { Password } from "../../domain/valueObjects/user/Password";
import { HashAndTokenManager } from "../../domain/gateways/HashAndTokenManager";
import { ENV } from "../../config/env";

// the number passed in bcrypt.hash is the number of salt loops.
// The bigger it is the longest the request will be (12 => 300 to 400 ms)

export class ProductionHashAndTokenManager implements HashAndTokenManager {
  public generateToken(params: WithUserUuid) {
    return jwt.sign(params, ENV.jwtSecret);
  }

  public hash(password: Password) {
    return bcrypt.hash(password.value, 12);
  }

  public compareHashes(candidatePassword: string, userPasswordHash: string) {
    return bcrypt.compare(candidatePassword, userPasswordHash);
  }
}
