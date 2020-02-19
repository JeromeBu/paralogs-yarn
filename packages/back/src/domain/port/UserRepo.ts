import { UserId } from "@paralogs/shared";
import { UserEntity } from "../entities/UserEntity";
import { Email } from "../valueObjects/user/Email";
import { Result } from "../core/Result";

export interface UserRepo {
  save: (userEntity: UserEntity) => Promise<Result<UserEntity>>;
  findByEmail: (email: Email) => Promise<UserEntity | undefined>;
  findById: (id: UserId) => Promise<UserEntity | undefined>;
}
