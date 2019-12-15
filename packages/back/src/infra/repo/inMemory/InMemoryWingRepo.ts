import { Wing, WingId, UserId } from "@paralogs/shared";
import { WingRepo } from "../../../domain/port/WingRepo";

export class InMemoryWingRepo implements WingRepo {
  private _wings: Wing[] = [];

  public async findById(id: WingId) {
    return this._wings.find(wing => id === wing.id);
  }

  public async findByUserId(userId: UserId) {
    return this._wings.filter(wing => userId.value === wing.userId.value);
  }

  public async save(wing: Wing) {
    this._wings = [...this._wings, wing];
  }

  get wings() {
    return this._wings;
  }
}
