import Knex from "knex";
import { FlightUuid, UserUuid } from "@paralogs/shared";
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

  public async findByUserId(userId: UserUuid) {
    return (
      await this.knex.from<FlightPersistence>("flights").where({ user_uuid: userId })
    ).map(flightPersistenceMapper.toEntity);
  }

  public async findById(flightId: FlightUuid) {
    const flightPersistence = await this.knex
      .from<FlightPersistence>("flights")
      .where({ uuid: flightId })
      .first();
    return flightPersistence && flightPersistenceMapper.toEntity(flightPersistence);
  }
}
