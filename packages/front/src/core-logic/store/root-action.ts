import { ActionType } from "typesafe-actions";

import { currentUserActions } from "../useCases/currentUser/currentUser.actions";
import { flightActions } from "../useCases/flights/flights.actions";
import { wingsActions } from "../useCases/wings/wings.actions";

const rootAction = {
  currentUser: currentUserActions,
  flight: flightActions,
  wing: wingsActions,
};

export type RootAction = ActionType<typeof rootAction>;
