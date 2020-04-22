import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserId } from "@paralogs/shared";
import { Password } from "../../domain/valueObjects/user/Password";
import { HashAndTokenManager } from "../../domain/gateways/HashAndTokenManager";

// the number passed in bcrypt.hash is the number of salt loops.
// The bigger it is the longest the request will be (12 => 300 to 400 ms)

export class TestHashAndTokenManager implements HashAndTokenManager {
  private token: string | null = null;

  public generateToken(params: { userId: UserId }) {
    return this.token ?? jwt.sign(params, "TODO: change Secret");
  }

  public hash(password: Password) {
    return bcrypt.hash(password.value, 1);
  }

  public compareHashes(candidatePassword: string, userPasswordHash: string) {
    return bcrypt.compare(candidatePassword, userPasswordHash);
  }

  public setGeneratedToken(nextToken: string) {
    this.token = nextToken;
  }
}
