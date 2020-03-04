import { UserId } from "@paralogs/shared";
import { UserEntity } from "../entities/UserEntity";
import { Email } from "../valueObjects/user/Email";
import { Result } from "../core/Result";
import { Option } from "../core/Option";

export interface UserRepo {
  save: (userEntity: UserEntity) => Promise<Result<UserEntity>>;
  findByEmail: (email: Email) => Promise<Option<UserEntity>>;
  findById: (id: UserId) => Promise<UserEntity | undefined>;
}
