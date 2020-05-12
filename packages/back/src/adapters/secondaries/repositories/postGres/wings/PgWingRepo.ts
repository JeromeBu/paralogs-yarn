import Knex from "knex";
import { PilotUuid, WingUuid } from "@paralogs/shared";
import { Maybe } from "purify-ts/Maybe";
import { liftMaybe, liftPromise } from "purify-ts/MaybeAsync";
import { notFoundError, ResultAsync, RightAsyncVoid } from "@paralogs/back-shared";

import { WingRepo } from "../../../../../domain/gateways/WingRepo";
import { WingEntity } from "../../../../../domain/entities/WingEntity";
import { wingPersistenceMapper } from "./wingPersistenceMapper";
import { WingPersistence } from "./WingPersistence";
import { PilotPersistence } from "../pilots/PilotPersistence";
import { knexError } from "../knex/knexErrors";

export class PgWingRepo implements WingRepo {
  constructor(private knex: Knex<any, unknown[]>) {}

  public async findByPilotUuid(pilot_uuid: PilotUuid) {
    return (await this.knex.from<WingPersistence>("wings").where({ pilot_uuid })).map(
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
    return this._getPilotId(wingEntity.pilotUuid).chain(pilotId =>
      wingEntity.hasIdentity()
        ? this._update(wingEntity, pilotId)
        : this._create(wingEntity, pilotId),
    );
  }

  private _create(wingEntity: WingEntity, pilot_id: number) {
    const wingPersistence = wingPersistenceMapper.toPersistence(wingEntity);
    return liftPromise(() =>
      this.knex<WingPersistence>("wings").insert({
        ...wingPersistence,
        pilot_id,
        id: undefined,
      }),
    )
      .toEitherAsync(knexError("Fail to create wing"))
      .chain(() => RightAsyncVoid());
  }

  private _update(wingEntity: WingEntity, pilot_id: number) {
    const {
      brand,
      model,
      pilotUuid,
      flightTimePriorToOwn,
      ownerFrom,
      ownerUntil,
    } = wingEntity.getProps();

    return liftPromise(() =>
      this.knex.from<WingPersistence>("wings").update({
        brand,
        model,
        pilot_uuid: pilotUuid,
        pilot_id,
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

  private _getPilotId(uuid: PilotUuid): ResultAsync<number> {
    return liftPromise(() =>
      this.knex
        .from<PilotPersistence>("pilots")
        .select("id")
        .where({ uuid })
        .first(),
    )
      .chain(w => liftMaybe(Maybe.fromNullable(w)))
      .toEitherAsync(notFoundError(`No pilot matched this pilotUuid: ${uuid}`))
      .map(({ id }) => id);
  }
}
