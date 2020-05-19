import { UserDTO } from "@paralogs/shared";

export type EventType = "UserSignedUp" | "UserUpdated";

export interface Event<K extends EventType, P> {
  dateTimeOccurred: Date;
  type: K;
  payload: P;
}

type UserSignedUpEvent = Event<"UserSignedUp", UserDTO>;
type UserUpdatedEvent = Event<"UserUpdated", UserDTO>;

export type AppEvent = UserSignedUpEvent | UserUpdatedEvent;
