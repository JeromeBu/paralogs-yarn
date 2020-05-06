import Knex from "knex";
import { Result, UserUuid, WingUuid } from "@paralogs/shared";
import { WingRepo } from "../../../../../domain/gateways/WingRepo";
import { WingEntity } from "../../../../../domain/entities/WingEntity";
import { wingPersistenceMapper } from "./wingPersistenceMapper";
import { WingPersistence } from "./WingPersistence";
import { UserPersistence } from "../users/UserPersistence";

export class PgWingRepo implements WingRepo {
  constructor(private knex: Knex<any, unknown[]>) {}

  public async findByUserUuid(user_uuid: UserUuid) {
    return (await this.knex.from<WingPersistence>("wings").where({ user_uuid })).map(
      wingPersistenceMapper.toEntity,
    );
  }

  public async findByUuid(uuid: WingUuid) {
    const wingPersistence = await this.knex
      .from<WingPersistence>("wings")
      .where({ uuid })
      .first();
    return wingPersistence && wingPersistenceMapper.toEntity(wingPersistence);
  }

  public async save(wingEntity: WingEntity) {
    const resultUserId = await this._getUserId(wingEntity.userUuid);
    return resultUserId.mapAsync(userId =>
      wingEntity.hasIdentity()
        ? this._update(wingEntity, userId)
        : this._create(wingEntity, userId),
    );
  }

  private async _create(wingEntity: WingEntity, user_id: number) {
    const wingPersistence = wingPersistenceMapper.toPersistence(wingEntity);
    await this.knex<WingPersistence>("wings").insert({
      ...wingPersistence,
      user_id,
      id: undefined,
    });
  }

  private async _update(wingEntity: WingEntity, user_id: number) {
    const {
      brand,
      model,
      userUuid,
      flightTimePriorToOwn,
      ownerFrom,
      ownerUntil,
    } = wingEntity.getProps();

    await this.knex.from<WingPersistence>("wings").update({
      brand,
      model,
      user_uuid: userUuid,
      user_id,
      flight_time_prior_to_own: flightTimePriorToOwn,
      owner_from: ownerFrom,
      owner_until: ownerUntil,
    });
  }

  private async _getUserId(uuid: UserUuid): Promise<Result<number>> {
    const user = await this.knex
      .from<UserPersistence>("users")
      .select("id")
      .where({ uuid })
      .first();
    if (!user) return Result.fail("No user matched this userUuid");
    return Result.ok(user.id);
  }
}
