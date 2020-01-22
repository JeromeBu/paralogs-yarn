import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Password } from "../../domain/valueObjects/user/Password";
import { HashAndTokenManager } from "../../domain/port/HashAndTokenManager";

// the number passed in bcrypt.hash is the number of salt loops.
// The bigger it is the longest the request will be (12 => 300 to 400 ms)

export class ProductionHashAndTokenManager implements HashAndTokenManager {
  generateToken(params: { userId: string }) {
    return jwt.sign(params, "TODO: change Secret");
  }

  hash(password: Password) {
    return bcrypt.hash(password.value, 12);
  }
}
