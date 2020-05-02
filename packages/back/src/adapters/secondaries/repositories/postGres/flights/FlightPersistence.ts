import { FlightUuid, UserUuid, WingUuid } from "@paralogs/shared";

export interface FlightPersistence {
  id: number;
  uuid: FlightUuid;
  user_uuid: UserUuid;
  user_id?: number;
  wing_uuid: WingUuid;
  wing_id?: number;
  date: string;
  time: string | null;
  site: string;
  duration: number;
}
