import { UserId } from "@paralogs/shared";
import { UserRepo } from "../../../../domain/port/UserRepo";
import { UserEntity } from "../../../../domain/entities/UserEntity";
import { Email } from "../../../../domain/valueObjects/user/Email";

export class InMemoryUserRepo implements UserRepo {
  public async save(userEntity: UserEntity) {
    const isEmailTaken = this._users.find(
      user => user.getProps().email.value === userEntity.getProps().email.value,
    );
    if (isEmailTaken) throw new Error("Email is already taken. Consider logging in.");
    this._users = [...this._users, userEntity];
    // eslint-disable-next-line no-console
    // console.log({ userRepo: this._users.map(user => user.getProps().email) });
  }

  public async findByEmail(email: Email) {
    return this._users.find(userEntity => {
      return userEntity.getProps().email.value === email.value;
    });
  }

  public async findById(userId: UserId) {
    return this._users.find(userEntity => {
      return userEntity.id === userId;
    });
  }

  public get users() {
    return this._users;
  }

  public setUsers(users: UserEntity[]) {
    this._users = users;
  }

  private _users: UserEntity[] = [];
}
