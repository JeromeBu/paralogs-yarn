import Knex from "knex";
import { UserId, WingId } from "@paralogs/shared";
import { WingRepo } from "../../../../../domain/gateways/WingRepo";
import { WingEntity, WingPersistence } from "../../../../../domain/entities/WingEntity";
import { wingPersistenceMapper } from "./wingPersistenceMapper";

export class PgWingRepo implements WingRepo {
  constructor(private knex: Knex<any, unknown[]>) {}
  public async create(wingEntity: WingEntity) {
    const wingPersistence = wingPersistenceMapper.toPersistence(wingEntity);
    await this.knex("wings").insert(wingPersistence);
  }

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
}
