import {
  DateString,
  FlightDTO,
  FlightUuid,
  NumberOfMinutes,
  UserUuid,
  WingUuid,
} from "@paralogs/shared";
import { Right } from "purify-ts";
import { Entity, Result } from "@paralogs/back-shared";

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
    return Right(new FlightEntity(props));
  }

  static fromDTO(props: FlightEntityProps) {
    return new FlightEntity(props);
  }

  public get userUuid() {
    return this.getProps().userUuid;
  }

  public get wingUuid() {
    return this.getProps().wingUuid;
  }

  private constructor(props: FlightEntityProps) {
    super(props);
  }
}
