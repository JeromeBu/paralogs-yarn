import Knex from "knex";
import { FlightUuid, Result, UserUuid, WingUuid } from "@paralogs/shared";
import { flightPersistenceMapper } from "./flightPersistenceMapper";
import { FlightRepo } from "../../../../../domain/gateways/FlightRepo";
import { FlightEntity } from "../../../../../domain/entities/FlightEntity";
import { FlightPersistence } from "./FlightPersistence";
import { UserPersistence } from "../users/UserPersistence";
import { WingPersistence } from "../wings/WingPersistence";

export class PgFlightRepo implements FlightRepo {
  constructor(private knex: Knex<any, unknown[]>) {}

  public async save(flightEntity: FlightEntity): Promise<Result<void>> {
    if (flightEntity.hasIdentity()) return Result.fail("TODO handle update");

    return Result.combine({
      user_id: await this._getUserId(flightEntity.userUuid),
      wing_id: await this._getWingId(flightEntity.wingUuid),
    }).mapAsync(async ({ user_id, wing_id }) => {
      await this.knex<FlightPersistence>("flights").insert({
        ...flightPersistenceMapper.toPersistence(flightEntity),
        user_id,
        wing_id,
        id: undefined,
      });
    });
  }

  public async findByUserUuid(user_uuid: UserUuid) {
    return (await this.knex.from<FlightPersistence>("flights").where({ user_uuid })).map(
      flightPersistenceMapper.toEntity,
    );
  }

  public async findByUuid(uuid: FlightUuid) {
    const flightPersistence = await this.knex
      .from<FlightPersistence>("flights")
      .where({ uuid })
      .first();
    return flightPersistence && flightPersistenceMapper.toEntity(flightPersistence);
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

  private async _getWingId(uuid: WingUuid): Promise<Result<number>> {
    const user = await this.knex
      .from<WingPersistence>("wings")
      .select("id")
      .where({ uuid })
      .first();
    if (!user) return Result.fail("No wing matched this wingUuid");
    return Result.ok(user.id);
  }
}
