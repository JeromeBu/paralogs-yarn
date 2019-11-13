import { ActionType } from "typesafe-actions";

import { currentUserActions } from "../useCases/currentUser/currentUser.actions";
import { flightActions } from "../useCases/flights/flights.actions";

const rootAction = {
  currentUser: currentUserActions,
  flight: flightActions,
};

export type RootAction = ActionType<typeof rootAction>;
