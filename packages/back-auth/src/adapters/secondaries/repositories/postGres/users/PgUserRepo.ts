import {
  LeftAsync,
  notUniqError,
  ResultAsync,
  RightAsyncVoid,
} from "@paralogs/back-shared";
import { UserUuid } from "@paralogs/shared";
import Knex from "knex";
import { Maybe } from "purify-ts";
import { liftPromise as liftPromiseToEitherAsync } from "purify-ts/EitherAsync";
import { liftMaybe, liftPromise as liftPromiseToMaybeAsync } from "purify-ts/MaybeAsync";

import { UserEntity } from "../../../../../domain/entities/UserEntity";
import { UserRepo } from "../../../../../domain/gateways/UserRepo";
import { Email } from "../../../../../domain/valueObjects/user/Email";
import { knexError } from "../knex/knexErrors";
import { UserPersistence } from "./UserPersistence";
import { userPersistenceMapper } from "./userPersistenceMapper";

export class PgUserRepo implements UserRepo {
  constructor(private knex: Knex<any, unknown[]>) {}

  public save(userEntity: UserEntity) {
    return userEntity.hasIdentity()
      ? LeftAsync(notUniqError("Update method not implemented"))
      : this._create(userEntity);
  }

  public findByEmail(email: Email) {
    return liftPromiseToMaybeAsync(() =>
      this.knex
        .from<UserPersistence>("users")
        .where({ email: email.value })
        .first(),
    )
      .chain(userPersistence => liftMaybe(Maybe.fromNullable(userPersistence)))
      .map(userPersistenceMapper.toEntity);
  }

  public findByUuid(uuid: UserUuid) {
    return liftPromiseToMaybeAsync(() =>
      this.knex
        .from<UserPersistence>("users")
        .where({ uuid })
        .first(),
    )
      .chain(userPersistence => liftMaybe(Maybe.fromNullable(userPersistence)))
      .map(userPersistenceMapper.toEntity);
  }

  private _create(userEntity: UserEntity): ResultAsync<void> {
    const userPersistence = userPersistenceMapper.toPersistence(userEntity);
    return liftPromiseToEitherAsync(() => this.knex("users").insert(userPersistence))
      .chainLeft((error: any) => {
        const isEmailTaken: boolean =
          error.detail?.includes("already exists") && error.detail?.includes("email");
        return LeftAsync(
          knexError(
            isEmailTaken ? "Email is already taken. Consider logging in." : error.message,
          ),
        );
      })
      .chain(RightAsyncVoid);
  }
}