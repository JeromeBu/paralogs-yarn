import {
  DateString,
  NumberOfMinutes,
  UpdateWingDTO,
  UserUuid,
  WingDTO,
  WingUuid,
} from "@paralogs/shared";
import { Right } from "purify-ts";
import { Entity } from "../core/Entity";
import { Result } from "../core/purifyAdds";

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
    return Right(new WingEntity(props));
  }

  public update(updateParams: UpdateWingDTO) {
    const wingEntity = new WingEntity({ ...this.getProps(), ...updateParams });
    wingEntity.setIdentity(this.getIdentity());
    return wingEntity;
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
