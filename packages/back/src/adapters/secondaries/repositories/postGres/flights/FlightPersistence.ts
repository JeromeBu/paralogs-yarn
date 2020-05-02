import { FlightUuid, UserUuid, WingUuid } from "@paralogs/shared";

export interface FlightPersistence {
  surrogate_id: number;
  uuid: FlightUuid;
  user_uuid: UserUuid;
  wing_uuid: WingUuid;
  date: string;
  time: string | null;
  site: string;
  duration: number;
}
