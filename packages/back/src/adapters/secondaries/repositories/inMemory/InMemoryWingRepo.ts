import { WingUuid, UserUuid, Result, findByUuidAndReplace } from "@paralogs/shared";
import { WingRepo } from "../../../../domain/gateways/WingRepo";
import { WingEntity } from "../../../../domain/entities/WingEntity";
import { getNextId } from "./helpers";

export class InMemoryWingRepo implements WingRepo {
  private _wings: WingEntity[] = [];

  public async findById(wingId: WingUuid) {
    return this._wings.find(wing => wing.uuid === wingId);
  }

  public async findByUserId(userId: UserUuid) {
    return this._wings.filter(wing => userId === wing.userUuid);
  }

  public async save(wingEntity: WingEntity) {
    return wingEntity.hasIdentity() ? this._update(wingEntity) : this._create(wingEntity);
  }

  get wings() {
    return this._wings;
  }

  private async _update(wingEntity: WingEntity): Promise<Result<void>> {
    this._wings = findByUuidAndReplace(this._wings, wingEntity);
    return Result.ok();
  }

  private async _create(wingEntity: WingEntity): Promise<Result<void>> {
    wingEntity.setIdentity(getNextId(this._wings));
    this._wings = [wingEntity, ...this._wings];
    return Result.ok();
  }
}
