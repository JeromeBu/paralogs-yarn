import { WingId, UserId } from "@paralogs/shared";
import { WingRepo } from "../../../../domain/gateways/WingRepo";
import { WingEntity } from "../../../../domain/entities/WingEntity";

export class InMemoryWingRepo implements WingRepo {
  private _wings: WingEntity[] = [];

  public async findById(wingId: WingId) {
    return this._wings.find(wing => wing.id === wingId);
  }

  public async findByUserId(userId: UserId) {
    return this._wings.filter(wing => userId === wing.userId);
  }

  public async create(wing: WingEntity) {
    this._wings = [wing, ...this._wings];
  }

  get wings() {
    return this._wings;
  }
}
