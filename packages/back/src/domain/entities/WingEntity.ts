import {
  WingDTO,
  DateString,
  NumberOfMinutes,
  WingId,
  UserId,
  Result,
  UpdateWingDTO,
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

export interface WingPersistence {
  id: WingId;
  user_id: UserId;
  brand: string;
  model: string;
  owner_from: DateString;
  owner_until: DateString | null;
  flight_time_prior_to_own: NumberOfMinutes;
}

export class WingEntity {
  get id() {
    return this.props.id;
  }

  public update(updateParams: UpdateWingDTO) {
    return new WingEntity({ ...this.getProps(), ...updateParams });
  }

  static createFromPersistence({
    id,
    user_id,
    brand,
    model,
    owner_from,
    owner_until,
    flight_time_prior_to_own,
  }: WingPersistence): WingEntity {
    return new WingEntity({
      id,
      userId: user_id,
      brand,
      model,
      ownerFrom: owner_from,
      ownerUntil: owner_until ?? undefined,
      flightTimePriorToOwn: flight_time_prior_to_own,
    });
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
