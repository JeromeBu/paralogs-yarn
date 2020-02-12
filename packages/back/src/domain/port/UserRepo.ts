import { UserEntity } from "../entities/UserEntity";
import { Email } from "../valueObjects/user/Email";

export interface UserRepo {
  save: (userEntity: UserEntity) => Promise<void>;
  findByEmail: (email: Email) => Promise<UserEntity | undefined>;
  findById: (id: string) => Promise<UserEntity | undefined>;
}
