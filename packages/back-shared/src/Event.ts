import { UserDTO } from "@paralogs/shared";

export type EventType = "UserSignedUp";

export interface Event<K extends EventType, P> {
  dateTimeOccurred: Date;
  type: K;
  payload: P;
}

type UserSignedUpEvent = Event<"UserSignedUp", UserDTO>;

export type AppEvent = UserSignedUpEvent;
