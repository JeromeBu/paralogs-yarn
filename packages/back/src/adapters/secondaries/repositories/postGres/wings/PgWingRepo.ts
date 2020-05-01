import Knex from "knex";
import { UserId, WingId } from "@paralogs/shared";
import { WingRepo } from "../../../../../domain/gateways/WingRepo";
import { WingEntity } from "../../../../../domain/entities/WingEntity";
import { wingPersistenceMapper } from "./wingPersistenceMapper";
import { WingPersistence } from "./WingPersistence";

export class PgWingRepo implements WingRepo {
  constructor(private knex: Knex<any, unknown[]>) {}

  public async findByUserId(userId: UserId) {
    return (
      await this.knex.from<WingPersistence>("wings").where({ user_id: userId })
    ).map(wingPersistenceMapper.toEntity);
  }

  public async findById(wingId: WingId) {
    const wingPersistence = await this.knex
      .from<WingPersistence>("wings")
      .where({ id: wingId })
      .first();
    return wingPersistence && wingPersistenceMapper.toEntity(wingPersistence);
  }

  public async save(wingEntity: WingEntity) {
    return wingEntity.hasIdentity() ? this._update(wingEntity) : this._create(wingEntity);
  }

  private async _create(wingEntity: WingEntity) {
    const wingPersistence = wingPersistenceMapper.toPersistence(wingEntity);
    await this.knex<WingPersistence>("wings").insert({
      ...wingPersistence,
      surrogate_id: undefined,
    });
  }

  private async _update(wingEntity: WingEntity) {
    const {
      brand,
      model,
      flightTimePriorToOwn,
      ownerFrom,
      ownerUntil,
    } = wingEntity.getProps();

    await this.knex.from<WingPersistence>("wings").update({
      brand,
      model,
      flight_time_prior_to_own: flightTimePriorToOwn,
      owner_from: ownerFrom,
      owner_until: ownerUntil,
    });
  }
}
