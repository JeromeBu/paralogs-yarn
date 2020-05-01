import { UserId, Result, Option } from "@paralogs/shared";
import { UserEntity } from "../entities/UserEntity";
import { Email } from "../valueObjects/user/Email";

export interface UserRepo {
  findByEmail: (email: Email) => Promise<Option<UserEntity>>;
  findById: (id: UserId) => Promise<UserEntity | undefined>;
  save: (userEntity: UserEntity) => Promise<Result<void>>;
}
