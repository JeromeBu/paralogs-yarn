import { Password } from "../valueObjects/user/Password";

export interface HashAndTokenManager {
  generateToken: (params: { userId: string }) => string;
  hash: (password: Password) => Promise<string>;
  compareHashes: (
    candidatePassword: string,
    userPasswordHash: string,
  ) => Promise<boolean>;
}
