import { WingId, UserId } from "@paralogs/shared";
import { WingRepo } from "../../../../domain/port/WingRepo";
import { WingEntity } from "../../../../domain/entities/WingEntity";

export class InMemoryWingRepo implements WingRepo {
  private _wings: WingEntity[] = [];

  public async findById(wingId: WingId) {
    return this._wings.find(wing => wing.id === wingId);
  }

  public async findByUserId(userId: UserId) {
    return this._wings.filter(wing => userId === wing.userId);
  }

  public async save(wing: WingEntity) {
    this._wings = [...this._wings, wing];
    // eslint-disable-next-line no-console
    console.log({ wingRepo: this._wings });
  }

  get wings() {
    return this._wings;
  }
}
