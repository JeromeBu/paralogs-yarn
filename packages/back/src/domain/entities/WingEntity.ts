import {
  WingDTO,
  DateString,
  NumberOfMinutes,
  WingId,
  UserId,
  Result,
} from "@paralogs/shared";

interface WingEntityProps {
  id: WingId;
  userId: UserId;
  brand: string;
  model: string;
  ownerFrom: DateString;
  ownerUntil?: DateString;
  flightTimePriorToOwn: NumberOfMinutes;
}

export class WingEntity {
  get id() {
    return this.props.id;
  }

  public getProps() {
    return this.props;
  }

  get userId() {
    return this.props.userId;
  }

  private constructor(private props: WingEntityProps) {}

  static create(props: WingDTO): Result<WingEntity> {
    return Result.ok(new WingEntity(props));
  }
}
