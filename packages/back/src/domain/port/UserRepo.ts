import { UserEntity } from "../entities/UserEntity";

export interface UserRepo {
  save: (userEntity: UserEntity) => Promise<void>;
}
