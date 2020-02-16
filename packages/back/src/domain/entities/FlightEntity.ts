import {
  FlightId,
  WingId,
  UserId,
  DateString,
  NumberOfMinutes,
  FlightDTO,
} from "@paralogs/shared";
import { Result } from "../core/Result";

interface FlightEntityProps {
  id: FlightId;
  wingId: WingId;
  userId: UserId;
  date: DateString;
  time?: string;
  site: string;
  duration: NumberOfMinutes;
}

export class FlightEntity {
  get id() {
    return this.props.id;
  }

  public getProps() {
    return this.props;
  }

  private constructor(private props: FlightEntityProps) {}

  static create(props: FlightDTO): Result<FlightEntity> {
    return Result.ok(new FlightEntity(props));
  }
}
