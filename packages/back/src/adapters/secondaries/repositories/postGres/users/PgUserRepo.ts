import { UserId, Result, fromNullable, Option } from "@paralogs/shared";
import Knex from "knex";
import { UserRepo } from "../../../../../domain/port/UserRepo";
import { UserEntity, UserPersistence } from "../../../../../domain/entities/UserEntity";
import { Email } from "../../../../../domain/valueObjects/user/Email";
import { userPersistenceMapper } from "./UserPersistenceMapper";

export class PgUserRepo implements UserRepo {
  public async create(userEntity: UserEntity): Promise<Result<UserEntity>> {
    const userPersistence = userPersistenceMapper.toPersistence(userEntity);

    const userWithGivenEmail = await this.knex
      .from<UserPersistence>("users")
      .select("id")
      .where({ email: userPersistence.email })
      .first();

    if (userWithGivenEmail)
      return Result.fail("Email is already taken. Consider logging in.");

    await this.knex("users").insert(userPersistence);
    return Result.ok(userEntity);
  }

  public async findByEmail(email: Email): Promise<Option<UserEntity>> {
    const userPgOrUndefined = await this.knex()
      .from<UserPersistence>("users")
      .where({ email: email.value })
      .first();

    return fromNullable(userPgOrUndefined).map(userPg =>
      userPersistenceMapper.toEntity(userPg),
    );
  }

  public async findById(userId: UserId) {
    return this._users.find(userEntity => {
      return userEntity.id === userId;
    });
  }

  constructor(private knex: Knex) {}

  private _users: UserEntity[] = [];
}
