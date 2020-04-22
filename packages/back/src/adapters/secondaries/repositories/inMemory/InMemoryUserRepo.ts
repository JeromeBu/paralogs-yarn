import { UserId, Result, fromNullable } from "@paralogs/shared";
import { UserRepo } from "../../../../domain/gateways/UserRepo";
import { UserEntity } from "../../../../domain/entities/UserEntity";
import { Email } from "../../../../domain/valueObjects/user/Email";

export class InMemoryUserRepo implements UserRepo {
  private _users: UserEntity[] = [];

  public async create(userEntity: UserEntity) {
    const isEmailTaken = !!this._users.find(
      user => user.getProps().email.value === userEntity.getProps().email.value,
    );
    if (isEmailTaken)
      return Result.fail<UserEntity>("Email is already taken. Consider logging in.");
    this._users.push(userEntity);
    return Result.ok(userEntity);
  }

  public async save(userEntity: UserEntity): Promise<Result<void>> {
    const indexOfUser = await this._users.findIndex(({ id }) => id === userEntity.id);
    if (indexOfUser === -1) return Result.fail("No user found with this id");
    this._users[indexOfUser] = userEntity;
    return Result.ok();
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

  get users() {
    return this._users;
  }

  public setUsers(users: UserEntity[]) {
    this._users.splice(0, users.length, ...users);
  }
}
