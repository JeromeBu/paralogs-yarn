import { UserId, Result, fromNullable, Option } from "@paralogs/shared";
import pg from "pg";
import _ from "lodash";
import { UserRepo } from "../../../../../domain/port/UserRepo";
import { UserEntity } from "../../../../../domain/entities/UserEntity";
import { Email } from "../../../../../domain/valueObjects/user/Email";
import { userPgMapper, UserPg } from "./UserPg";

export class PgUserRepo implements UserRepo {
  public async create(userEntity: UserEntity): Promise<Result<UserEntity>> {
    // TODO : make a create and update methode, so the unicity check is done only on create
    const userPg = userPgMapper.toPg(userEntity);

    const isEmailTaken = await this.pgClient.query(
      `SELECT id FROM users WHERE email = ${userPg.email}`,
    );
    if (isEmailTaken) return Result.fail("Email is already taken. Consider logging in.");
    await this.pgClient.query(`INSERT INTO users(${_.keys(userPg).join(", ")})
      VALUES(${_.keys(userPg).join(", ")})`);
    return Result.ok(userEntity);
  }

  public async findByEmail(email: Email): Promise<Option<UserEntity>> {
    return fromNullable(
      _.head(
        (
          await this.pgClient.query<UserPg>(
            `SELECT * FROM users WHERE email = ${email.value}`,
          )
        ).rows,
      ),
    ).map(userPg => userPgMapper.toEntity(userPg));
  }

  public async findById(userId: UserId) {
    return this._users.find(userEntity => {
      return userEntity.id === userId;
    });
  }

  constructor(private pgClient: pg.Pool) {}

  private _users: UserEntity[] = [];
}
