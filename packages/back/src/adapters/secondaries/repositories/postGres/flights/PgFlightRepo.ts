import Knex from "knex";
import { FlightId, UserId } from "@paralogs/shared";
import { flightPersistenceMapper } from "./flightPersistenceMapper";
import { FlightRepo } from "../../../../../domain/gateways/FlightRepo";
import { FlightEntity } from "../../../../../domain/entities/FlightEntity";
import { FlightPersistence } from "./FlightPersistence";

export class PgFlightRepo implements FlightRepo {
  constructor(private knex: Knex<any, unknown[]>) {}
  public async save(flightEntity: FlightEntity) {
    const flightPersistence = flightPersistenceMapper.toPersistence(flightEntity);
    if (flightEntity.hasIdentity()) {
      // eslint-disable-next-line no-console
      console.error("TODO handle update");
      return;
    }
    await this.knex("flights").insert(flightPersistence);
  }

  public async findByUserId(userId: UserId) {
    return (
      await this.knex.from<FlightPersistence>("flights").where({ user_id: userId })
    ).map(flightPersistenceMapper.toEntity);
  }

  public async findById(flightId: FlightId) {
    const flightPersistence = await this.knex
      .from<FlightPersistence>("flights")
      .where({ id: flightId })
      .first();
    return flightPersistence && flightPersistenceMapper.toEntity(flightPersistence);
  }
}
