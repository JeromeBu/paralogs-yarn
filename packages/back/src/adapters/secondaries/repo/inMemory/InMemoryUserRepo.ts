import { UserRepo } from "../../../../domain/port/UserRepo";
import { UserEntity } from "../../../../domain/entities/UserEntity";
import { Email } from "../../../../domain/valueObjects/user/Email";

export class InMemoryUserRepo implements UserRepo {
  public async save(userEntity: UserEntity) {
    this._users = [...this._users, userEntity];
  }

  public async findByEmail(email: Email) {
    return this._users.find(userEntity => {
      return userEntity.getProps().email.value === email.value;
    });
  }

  public get users() {
    return this._users;
  }

  public set users(users: UserEntity[]) {
    this._users = users;
  }

  private _users: UserEntity[] = [];
}
