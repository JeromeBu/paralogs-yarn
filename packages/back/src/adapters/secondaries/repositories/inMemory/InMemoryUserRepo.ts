import { UserId, Result, fromNullable } from "@paralogs/shared";
import { UserRepo } from "../../../../domain/port/UserRepo";
import { UserEntity } from "../../../../domain/entities/UserEntity";
import { Email } from "../../../../domain/valueObjects/user/Email";

export class InMemoryUserRepo implements UserRepo {
  public async create(userEntity: UserEntity) {
    const isEmailTaken = !!this._users.find(
      user => user.getProps().email.value === userEntity.getProps().email.value,
    );
    if (isEmailTaken)
      return Result.fail<UserEntity>("Email is already taken. Consider logging in.");
    this._users = [...this._users, userEntity];
    // eslint-disable-next-line no-console
    // console.log({
    //   userRepo: this._users.map(user => ({
    //     email: user.getProps().email.value,
    //     token: user.getProps().authToken,
    //   })),
    // });
    return Result.ok(userEntity);
  }

  public async findByEmail(email: Email) {
    return fromNullable(
      this._users.find(userEntity => userEntity.getProps().email.value === email.value),
    );
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
