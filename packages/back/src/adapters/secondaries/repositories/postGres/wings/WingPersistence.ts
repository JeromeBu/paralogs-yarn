import { DateString, NumberOfMinutes, UserUuid, WingUuid } from "@paralogs/shared";

export interface WingPersistence {
  surrogate_id: number;
  uuid: WingUuid;
  user_uuid: UserUuid;
  user_surrogate_id?: number;
  brand: string;
  model: string;
  owner_from: DateString;
  owner_until: DateString | null;
  flight_time_prior_to_own: NumberOfMinutes;
}
