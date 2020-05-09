import { UserUuid } from "@paralogs/shared";
import Knex from "knex";
import { liftMaybe, liftPromise as liftPromiseToMaybeAsync } from "purify-ts/MaybeAsync";
import { Maybe } from "purify-ts";
import { liftPromise as liftPromiseToEitherAsync } from "purify-ts/EitherAsync";
import { LeftAsync, ResultAsync, RightAsyncVoid } from "@paralogs/back-shared";

import { UserEntity } from "../../../../../domain/entities/UserEntity";
import { Email } from "../../../../../domain/valueObjects/user/Email";
import { userPersistenceMapper } from "./userPersistenceMapper";
import { UserRepo } from "../../../../../domain/gateways/UserRepo";
import { UserPersistence } from "./UserPersistence";
import { knexError } from "../knex/knexErrors";

export class PgUserRepo implements UserRepo {
  constructor(private knex: Knex<any, unknown[]>) {}

  public save(userEntity: UserEntity) {
    return userEntity.hasIdentity() ? this._update(userEntity) : this._create(userEntity);
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

  private _update(userEntity: UserEntity): ResultAsync<void> {
    const { firstName, lastName } = userEntity.getProps();
    return liftPromiseToEitherAsync(() =>
      this.knex("users")
        .from<UserPersistence>("users")
        .where({ uuid: userEntity.uuid })
        .update({
          first_name: firstName.value,
          ...(lastName
            ? {
                last_name: lastName?.value,
              }
            : {}),
        }),
    )
      .chain(RightAsyncVoid)
      .chainLeft(error => {
        // eslint-disable-next-line no-console
        console.error("Fail to update user :", error);
        return LeftAsync(knexError("Fail to update user"));
      });
  }
}
