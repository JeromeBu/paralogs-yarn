import { ActionType } from "typesafe-actions";

import { authActions } from "../useCases/auth/auth.actions";
import { flightActions } from "../useCases/flights/flights.actions";
import { wingsActions } from "../useCases/wings/wings.actions";

const rootAction = {
  currentUser: authActions,
  flight: flightActions,
  wing: wingsActions,
};

export type RootAction = ActionType<typeof rootAction>;
