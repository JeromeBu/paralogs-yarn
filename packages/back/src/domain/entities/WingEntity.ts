import {
  DateString,
  NumberOfMinutes,
  Result,
  UpdateWingDTO,
  UserUuid,
  WingDTO,
  WingUuid,
} from "@paralogs/shared";
import { Entity } from "../core/Entity";

interface WingEntityProps {
  uuid: WingUuid;
  userUuid: UserUuid;
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

  get userUuid() {
    return this.props.userUuid;
  }

  static fromDTO(props: WingEntityProps): WingEntity {
    return new WingEntity(props);
  }

  private constructor(props: WingEntityProps) {
    super(props);
  }
}
