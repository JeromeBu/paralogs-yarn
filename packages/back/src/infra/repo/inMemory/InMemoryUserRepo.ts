import { UserRepo } from "../../../domain/port/UserRepo";
import { UserEntity } from "../../../domain/entities/UserEntity";

export class InMemoryUserRepo implements UserRepo {
  private _users: UserEntity[] = [];

  public async save(userEntity: UserEntity) {
    this._users = [...this._users, userEntity];
  }

  public get users() {
    return this._users;
  }
}
