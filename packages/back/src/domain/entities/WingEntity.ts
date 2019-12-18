import { WingDTO, DateString, NumberOfMinutes } from "@paralogs/shared";
import { WingId } from "../valueObjects/WingId";
import { UserId } from "../valueObjects/UserId";
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

  get userId() {
    return this.props.userId;
  }

  public getProps() {
    return this.props;
  }
  private constructor(private props: WingEntityProps) {}

  static create(props: WingDTO): Result<WingEntity> {
    const wingIdOrError = WingId.create(props.id);
    const userIdOrError = UserId.create(props.userId);

    const propsResult = Result.combine([wingIdOrError, userIdOrError]);
    if (propsResult.error) return Result.fail(propsResult.error);

    return Result.ok(
      new WingEntity({
        ...props,
        id: wingIdOrError.getValueOrThrow(),
        userId: userIdOrError.getValueOrThrow(),
      }),
    );
  }
}
