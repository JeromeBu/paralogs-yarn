import { FlightId, UserId, WingId } from "@paralogs/shared";

export interface FlightPersistence {
  surrogate_id: number;
  id: FlightId;
  user_id: UserId;
  wing_id: WingId;
  date: string;
  time: string | null;
  site: string;
  duration: number;
}
