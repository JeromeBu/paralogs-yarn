import {
  FlightId,
  WingId,
  UserId,
  DateString,
  NumberOfMinutes,
  FlightDTO,
  Result,
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

export interface FlightPersistence {
  id: FlightId;
  user_id: UserId;
  wing_id: WingId;
  date: string;
  time: string | null;
  site: string;
  duration: number;
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

  static createFromPersistence({
    id,
    wing_id,
    user_id,
    time,
    site,
    duration,
    date,
  }: FlightPersistence) {
    return new FlightEntity({
      id,
      userId: user_id,
      wingId: wing_id,
      time: time ?? undefined,
      site,
      duration,
      date,
    });
  }

  static create(props: FlightDTO): Result<FlightEntity> {
    return Result.ok(new FlightEntity(props));
  }
}
