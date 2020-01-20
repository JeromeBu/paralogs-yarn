import { WingDTO, DateString, NumberOfMinutes } from "@paralogs/shared";
import { WingId } from "../valueObjects/WingId";
import { UserId } from "../valueObjects/user/UserId";
import { Result } from "../core/Result";

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

  static create({ id, userId, ...props }: WingDTO): Result<WingEntity> {
    return Result.combine(
      { id: WingId.create(id), userId: UserId.create(userId) },
      resultProps =>
        new WingEntity({
          ...props,
          ...resultProps,
        }),
    );
  }
}
