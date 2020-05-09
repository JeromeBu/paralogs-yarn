import Knex from "knex";
import { UserUuid, WingUuid } from "@paralogs/shared";
import { Maybe } from "purify-ts/Maybe";
import { liftMaybe, liftPromise } from "purify-ts/MaybeAsync";
import { ResultAsync, RightAsyncVoid, notFoundError } from "@paralogs/back-shared";

import { WingRepo } from "../../../../../domain/gateways/WingRepo";
import { WingEntity } from "../../../../../domain/entities/WingEntity";
import { wingPersistenceMapper } from "./wingPersistenceMapper";
import { WingPersistence } from "./WingPersistence";
import { UserPersistence } from "../users/UserPersistence";
import { knexError } from "../knex/knexErrors";

export class PgWingRepo implements WingRepo {
  constructor(private knex: Knex<any, unknown[]>) {}

  public async findByUserUuid(user_uuid: UserUuid) {
    return (await this.knex.from<WingPersistence>("wings").where({ user_uuid })).map(
      wingPersistenceMapper.toEntity,
    );
  }

  public findByUuid(uuid: WingUuid) {
    return liftPromise(() =>
      this.knex
        .from<WingPersistence>("wings")
        .where({ uuid })
        .first(),
    )
      .chain(w => liftMaybe(Maybe.fromNullable(w)))
      .map(wingPersistenceMapper.toEntity);
  }

  public save(wingEntity: WingEntity) {
    return this._getUserId(wingEntity.userUuid).chain(userId =>
      wingEntity.hasIdentity()
        ? this._update(wingEntity, userId)
        : this._create(wingEntity, userId),
    );
  }

  private _create(wingEntity: WingEntity, user_id: number) {
    const wingPersistence = wingPersistenceMapper.toPersistence(wingEntity);
    return liftPromise(() =>
      this.knex<WingPersistence>("wings").insert({
        ...wingPersistence,
        user_id,
        id: undefined,
      }),
    )
      .toEitherAsync(knexError("Fail to create wing"))
      .chain(() => RightAsyncVoid());
  }

  private _update(wingEntity: WingEntity, user_id: number) {
    const {
      brand,
      model,
      userUuid,
      flightTimePriorToOwn,
      ownerFrom,
      ownerUntil,
    } = wingEntity.getProps();

    return liftPromise(() =>
      this.knex.from<WingPersistence>("wings").update({
        brand,
        model,
        user_uuid: userUuid,
        user_id,
        flight_time_prior_to_own: flightTimePriorToOwn,
        owner_from: ownerFrom,
        owner_until: ownerUntil,
      }),
    )
      .toEitherAsync(knexError(`Fail to update wing with id ${wingEntity.uuid}`))
      .chain(() => {
        return RightAsyncVoid();
      });
  }

  private _getUserId(uuid: UserUuid): ResultAsync<number> {
    return liftPromise(() =>
      this.knex
        .from<UserPersistence>("users")
        .select("id")
        .where({ uuid })
        .first(),
    )
      .chain(w => liftMaybe(Maybe.fromNullable(w)))
      .toEitherAsync(notFoundError("No user matched this userUuid"))
      .map(({ id }) => id);
  }
}
