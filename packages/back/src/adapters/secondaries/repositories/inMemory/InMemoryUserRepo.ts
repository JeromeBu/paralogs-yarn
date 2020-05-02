import { UserUuid, Result, fromNullable } from "@paralogs/shared";
import { UserRepo } from "../../../../domain/gateways/UserRepo";
import { UserEntity } from "../../../../domain/entities/UserEntity";
import { Email } from "../../../../domain/valueObjects/user/Email";
import { getNextId } from "./helpers";

export class InMemoryUserRepo implements UserRepo {
  private _users: UserEntity[] = [];

  public async save(userEntity: UserEntity): Promise<Result<void>> {
    if (userEntity.hasIdentity()) return this._update(userEntity);
    return this._create(userEntity);
  }

  public async findByEmail(email: Email) {
    return fromNullable(
      this._users.find(userEntity => userEntity.getProps().email.value === email.value),
    );
  }

  public async findById(userUuid: UserUuid) {
    return this._users.find(userEntity => {
      return userEntity.uuid === userUuid;
    });
  }

  get users() {
    return this._users;
  }

  public setUsers(users: UserEntity[]) {
    this._users.splice(0, users.length, ...users);
  }

  private async _create(userEntity: UserEntity): Promise<Result<void>> {
    const isEmailTaken = !!this._users.find(
      user => user.getProps().email.value === userEntity.getProps().email.value,
    );
    if (isEmailTaken) return Result.fail("Email is already taken. Consider logging in.");
    userEntity.setIdentity(getNextId(this._users));
    this._users.push(userEntity);
    return Result.ok();
  }

  private async _update(userEntity: UserEntity): Promise<Result<void>> {
    const indexOfUser = await this._users.findIndex(
      ({ uuid }) => uuid === userEntity.uuid,
    );
    if (indexOfUser === -1) return Result.fail("No user found with this id");
    this._users[indexOfUser] = userEntity;
    return Result.ok();
  }
}
