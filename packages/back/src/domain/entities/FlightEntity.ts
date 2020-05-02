import {
  DateString,
  FlightDTO,
  FlightUuid,
  NumberOfMinutes,
  Result,
  UserUuid,
  WingUuid,
} from "@paralogs/shared";
import { Entity } from "../core/Entity";

interface FlightEntityProps {
  uuid: FlightUuid;
  wingUuid: WingUuid;
  userUuid: UserUuid;
  date: DateString;
  time?: string;
  site: string;
  duration: NumberOfMinutes;
}

export class FlightEntity extends Entity<FlightEntityProps> {
  static create(props: FlightDTO): Result<FlightEntity> {
    return Result.ok(new FlightEntity(props));
  }

  static fromDTO(props: FlightEntityProps) {
    return new FlightEntity(props);
  }

  private constructor(props: FlightEntityProps) {
    super(props);
  }
}
