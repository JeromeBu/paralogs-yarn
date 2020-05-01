import {
  DateString,
  NumberOfMinutes,
  Result,
  UpdateWingDTO,
  UserId,
  WingDTO,
  WingId,
} from "@paralogs/shared";
import { Entity } from "../core/Entity";

interface WingEntityProps {
  id: WingId;
  userId: UserId;
  brand: string;
  model: string;
  ownerFrom: DateString;
  ownerUntil?: DateString;
  flightTimePriorToOwn: NumberOfMinutes;
}

export class WingEntity extends Entity<WingEntityProps> {
  static create(props: WingDTO): Result<WingEntity> {
    return Result.ok(new WingEntity(props));
  }

  public update(updateParams: UpdateWingDTO) {
    const wingIdentity = new WingEntity({ ...this.getProps(), ...updateParams });
    wingIdentity.setIdentity(this.getIdentity());
    return wingIdentity;
  }

  get userId() {
    return this.props.userId;
  }

  static fromDTO(props: WingEntityProps): WingEntity {
    return new WingEntity(props);
  }

  private constructor(props: WingEntityProps) {
    super(props);
  }
}
