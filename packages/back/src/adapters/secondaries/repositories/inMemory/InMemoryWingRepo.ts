import { findByUuidAndReplace, UserUuid, WingUuid } from "@paralogs/shared";
import { liftMaybe } from "purify-ts/MaybeAsync";
import { List } from "purify-ts";
import { ResultAsync, RightAsyncVoid } from "@paralogs/back-shared";

import { WingRepo } from "../../../../domain/gateways/WingRepo";
import { WingEntity } from "../../../../domain/entities/WingEntity";
import { getNextId } from "./helpers";

export class InMemoryWingRepo implements WingRepo {
  private _wings: WingEntity[] = [];

  public findByUuid(wingUuid: WingUuid) {
    const maybeWingEntity = List.find(wing => wing.uuid === wingUuid, this.wings);
    return liftMaybe(maybeWingEntity);
  }

  public async findByUserUuid(userUuid: UserUuid) {
    return this._wings.filter(wing => userUuid === wing.userUuid);
  }

  public save(wingEntity: WingEntity): ResultAsync<void> {
    return wingEntity.hasIdentity() ? this._update(wingEntity) : this._create(wingEntity);
  }

  get wings() {
    return this._wings;
  }

  private _update(wingEntity: WingEntity): ResultAsync<void> {
    findByUuidAndReplace(this._wings, wingEntity);
    return RightAsyncVoid();
  }

  private _create(wingEntity: WingEntity): ResultAsync<void> {
    wingEntity.setIdentity(getNextId(this._wings));
    this._wings = [wingEntity, ...this._wings];
    return RightAsyncVoid();
  }
}
