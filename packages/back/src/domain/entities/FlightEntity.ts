import {
  DateString,
  FlightDTO,
  FlightId,
  NumberOfMinutes,
  Result,
  UserId,
  WingId,
} from "@paralogs/shared";
import { Entity } from "../core/Entity";

interface FlightEntityProps {
  id: FlightId;
  wingId: WingId;
  userId: UserId;
  date: DateString;
  time?: string;
  site: string;
  duration: NumberOfMinutes;
}

export class FlightEntity extends Entity {
  get id() {
    return this.props.id;
  }

  public getProps() {
    return this.props;
  }

  private constructor(private props: FlightEntityProps) {
    super();
  }

  static fromDTO(props: FlightEntityProps) {
    return new FlightEntity(props);
  }

  static create(props: FlightDTO): Result<FlightEntity> {
    return Result.ok(new FlightEntity(props));
  }
}
