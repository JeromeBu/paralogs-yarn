import { WingRepo } from "../../../../domain/port/WingRepo";
import { WingEntity } from "../../../../domain/entities/WingEntity";
import { UserId } from "../../../../domain/valueObjects/user/UserId";
import { WingId } from "../../../../domain/valueObjects/WingId";

export class InMemoryWingRepo implements WingRepo {
  private _wings: WingEntity[] = [];

  public async findById(id: WingId) {
    return this._wings.find(wing => id.value === wing.id.value);
  }

  public async findByUserId(userId: UserId) {
    return this._wings.filter(wing => userId.value === wing.userId.value);
  }

  public async save(wing: WingEntity) {
    this._wings = [...this._wings, wing];
  }

  get wings() {
    return this._wings;
  }
}
