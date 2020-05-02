import { UserUuid, Result, fromNullable } from "@paralogs/shared";
import Knex from "knex";
import { UserEntity } from "../../../../../domain/entities/UserEntity";
import { Email } from "../../../../../domain/valueObjects/user/Email";
import { userPersistenceMapper } from "./userPersistenceMapper";
import { UserRepo } from "../../../../../domain/gateways/UserRepo";
import { UserPersistence } from "./UserPersistence";

export class PgUserRepo implements UserRepo {
  constructor(private knex: Knex<any, unknown[]>) {}

  public async save(userEntity: UserEntity): Promise<Result<void>> {
    if (userEntity.hasIdentity()) return this._update(userEntity);
    return this._create(userEntity);
  }

  public async findByEmail(email: Email) {
    const userPgOrUndefined = await this.knex
      .from<UserPersistence>("users")
      .where({ email: email.value })
      .first();
    return fromNullable(userPgOrUndefined).map(userPersistence =>
      userPersistenceMapper.toEntity(userPersistence),
    );
  }

  public async findByUuid(uuid: UserUuid) {
    const userPersistence = await this.knex
      .from<UserPersistence>("users")
      .where({ uuid })
      .first();
    return userPersistence && userPersistenceMapper.toEntity(userPersistence);
  }

  private async _create(userEntity: UserEntity): Promise<Result<void>> {
    const userPersistence = userPersistenceMapper.toPersistence(userEntity);

    try {
      await this.knex("users").insert(userPersistence);
      return Result.ok();
    } catch (error) {
      const isEmailTaken: boolean =
        error.detail?.includes("already exists") && error.detail?.includes("email");
      return Result.fail(
        isEmailTaken ? "Email is already taken. Consider logging in." : error,
      );
    }
  }

  private async _update(userEntity: UserEntity) {
    const { firstName, lastName } = userEntity.getProps();

    return this.knex("users")
      .from<UserPersistence>("users")
      .where({ uuid: userEntity.uuid })
      .update({
        first_name: firstName.value,
        ...(lastName
          ? {
              last_name: lastName?.value,
            }
          : {}),
      })
      .then(() => Result.ok<void>())
      .catch(err => Result.fail<void>(err));
  }
}
