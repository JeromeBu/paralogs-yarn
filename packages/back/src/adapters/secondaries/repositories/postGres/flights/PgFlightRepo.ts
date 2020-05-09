import Knex from "knex";
import { FlightUuid, UserUuid, WingUuid } from "@paralogs/shared";
import { Maybe } from "purify-ts";
import { liftPromise as liftPromiseToEitherAsync } from "purify-ts/EitherAsync";
import { liftMaybe, liftPromise as liftPromiseToMaybeAsync } from "purify-ts/MaybeAsync";
import {
  LeftAsync,
  ResultAsync,
  RightAsyncVoid,
  notFoundError,
  validationError,
} from "@paralogs/back-shared";

import { flightPersistenceMapper } from "./flightPersistenceMapper";
import { FlightRepo } from "../../../../../domain/gateways/FlightRepo";
import { FlightEntity } from "../../../../../domain/entities/FlightEntity";
import { FlightPersistence } from "./FlightPersistence";
import { UserPersistence } from "../users/UserPersistence";
import { WingPersistence } from "../wings/WingPersistence";

export class PgFlightRepo implements FlightRepo {
  constructor(private knex: Knex<any, unknown[]>) {}

  public save(flightEntity: FlightEntity): ResultAsync<void> {
    if (flightEntity.hasIdentity())
      return LeftAsync(validationError("TODO handle update"));

    this._getUserId(flightEntity.userUuid);

    const eitherParams = this._getUserId(flightEntity.userUuid).chain(user_id =>
      this._getWingId(flightEntity.wingUuid).map(wing_id => ({ wing_id, user_id })),
    );

    return eitherParams
      .chain(({ user_id, wing_id }) =>
        liftPromiseToEitherAsync(() =>
          this.knex<FlightPersistence>("flights").insert({
            ...flightPersistenceMapper.toPersistence(flightEntity),
            user_id,
            wing_id,
            id: undefined,
          }),
        ),
      )
      .chain(RightAsyncVoid);
  }

  public async findByUserUuid(user_uuid: UserUuid) {
    return (await this.knex.from<FlightPersistence>("flights").where({ user_uuid })).map(
      flightPersistenceMapper.toEntity,
    );
  }

  public findByUuid(uuid: FlightUuid) {
    return liftPromiseToMaybeAsync(() =>
      this.knex
        .from<FlightPersistence>("flights")
        .where({ uuid })
        .first(),
    )
      .chain(flightPersistence => liftMaybe(Maybe.fromNullable(flightPersistence)))
      .map(flightPersistenceMapper.toEntity);
  }

  private _getUserId(uuid: UserUuid): ResultAsync<number> {
    return liftPromiseToMaybeAsync(() =>
      this.knex
        .from<UserPersistence>("users")
        .select("id")
        .where({ uuid })
        .first(),
    )
      .chain(userPersistence => liftMaybe(Maybe.fromNullable(userPersistence)))
      .map(({ id }) => id)
      .toEitherAsync(notFoundError("No user matched this userUuid"));
  }

  private _getWingId(uuid: WingUuid): ResultAsync<number> {
    return liftPromiseToMaybeAsync(() =>
      this.knex
        .from<WingPersistence>("wings")
        .select("id")
        .where({ uuid })
        .first(),
    )
      .chain(wingPersistence => liftMaybe(Maybe.fromNullable(wingPersistence)))
      .map(({ id }) => id)
      .toEitherAsync(notFoundError("No wing matched this wingUuid"));
  }
}
