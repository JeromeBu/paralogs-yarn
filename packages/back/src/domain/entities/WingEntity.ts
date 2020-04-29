import {
  WingDTO,
  DateString,
  NumberOfMinutes,
  WingId,
  UserId,
  Result,
  UpdateWingDTO,
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

export interface WingPersistence {
  surrogateId: number;
  id: WingId;
  user_id: UserId;
  brand: string;
  model: string;
  owner_from: DateString;
  owner_until: DateString | null;
  flight_time_prior_to_own: NumberOfMinutes;
}

export class WingEntity extends Entity {
  get id() {
    return this.props.id;
  }

  public update(updateParams: UpdateWingDTO) {
    return new WingEntity({ ...this.getProps(), ...updateParams });
  }

  public getProps() {
    return this.props;
  }

  get userId() {
    return this.props.userId;
  }

  private constructor(private props: WingEntityProps) {
    super();
  }

  static create(props: WingDTO): Result<WingEntity> {
    return Result.ok(new WingEntity(props));
  }

  static fromDTO(props: WingDTO): WingEntity {
    return new WingEntity(props);
  }
}
