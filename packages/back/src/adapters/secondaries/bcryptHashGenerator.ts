import { hash } from "bcryptjs";
import { HashGenerator } from "../../domain/port/HashGenerator";
import { Password } from "../../domain/valueObjects/user/Password";

// the number passed is the number of saltLoop.
// The bigger it is the longest the request will be (12 => 300 to 400 ms)

export const bcryptHashGenerator: HashGenerator = (password: Password) =>
  hash(password.value, 12);

export const bcryptTestHashGenerator: HashGenerator = (password: Password) =>
  hash(password.value, 1);
