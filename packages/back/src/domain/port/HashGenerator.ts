import { Password } from "../valueObjects/user/Password";

export type HashGenerator = (password: Password) => Promise<string>;
