import { WingId, UserId, findByIdAndReplace } from "@paralogs/shared";
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

  public async save(wingEntity: WingEntity) {
    this._wings = wingEntity.hasIdentity()
      ? findByIdAndReplace(this._wings, wingEntity)
      : [wingEntity, ...this._wings];
  }

  get wings() {
    return this._wings;
  }
}
