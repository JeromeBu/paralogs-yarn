import Knex from "knex";
import { Result, UserId, WingId } from "@paralogs/shared";
import { WingRepo } from "../../../../../domain/gateways/WingRepo";
import { WingEntity } from "../../../../../domain/entities/WingEntity";
import { wingPersistenceMapper } from "./wingPersistenceMapper";
import { WingPersistence } from "./WingPersistence";
import { UserPersistence } from "../users/UserPersistence";

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
    const resultUserSurrogateId = await this._getUserSurrogateId(wingEntity.userId);
    return resultUserSurrogateId.mapAsync(userSurrogateId =>
      wingEntity.hasIdentity()
        ? this._update(wingEntity, userSurrogateId)
        : this._create(wingEntity, userSurrogateId),
    );
  }

  private async _create(wingEntity: WingEntity, user_surrogate_id: number) {
    const wingPersistence = wingPersistenceMapper.toPersistence(wingEntity);
    await this.knex<WingPersistence>("wings").insert({
      ...wingPersistence,
      user_surrogate_id,
      surrogate_id: undefined,
    });
  }

  private async _update(wingEntity: WingEntity, user_surrogate_id: number) {
    const {
      brand,
      model,
      userId,
      flightTimePriorToOwn,
      ownerFrom,
      ownerUntil,
    } = wingEntity.getProps();

    await this.knex.from<WingPersistence>("wings").update({
      brand,
      model,
      user_id: userId,
      user_surrogate_id,
      flight_time_prior_to_own: flightTimePriorToOwn,
      owner_from: ownerFrom,
      owner_until: ownerUntil,
    });
  }

  private async _getUserSurrogateId(userId: UserId): Promise<Result<number>> {
    const user = await this.knex
      .from<UserPersistence>("users")
      .select("surrogate_id")
      .where({ id: userId })
      .first();
    if (!user) return Result.fail("No user matched this userId");
    return Result.ok(user.surrogate_id);
  }
}
