import { DateString, NumberOfMinutes, UserId, WingId } from "@paralogs/shared";

export interface WingPersistence {
  surrogate_id: number;
  id: WingId;
  user_id: UserId;
  brand: string;
  model: string;
  owner_from: DateString;
  owner_until: DateString | null;
  flight_time_prior_to_own: NumberOfMinutes;
}
