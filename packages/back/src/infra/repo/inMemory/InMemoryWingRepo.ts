import { Wing, UUID } from "@paralogs/shared";
import { WingRepo } from "../../../domain/port/WingRepo";

export class InMemoryWingRepo implements WingRepo {
  private _wings: Wing[] = [];

  public async findById(id: UUID) {
    return this._wings.find(wing => id === wing.id);
  }

  public async findByUserId(userId: UUID) {
    return this._wings.filter(wing => userId === wing.userId);
  }

  public async save(wing: Wing) {
    this._wings = [...this._wings, wing];
  }

  get wings() {
    return this._wings;
  }
}
