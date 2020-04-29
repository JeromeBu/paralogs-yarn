import { ValueOf } from "@paralogs/shared";
import { authActions, AuthAction } from "../useCases/auth/auth.slice";
import { WingAction, wingActions } from "../useCases/wings/wings.slice";
import { FlightAction, flightActions } from "../useCases/flights/flights.slice";
import { PilotAction, pilotActions } from "../useCases/pilot/pilote.slice";

const actionCreators = {
  currentUser: authActions,
  flight: flightActions,
  wing: wingActions,
  pilot: pilotActions,
};

export type RootActionCreator = ValueOf<typeof actionCreators>;

export type RootAction = AuthAction | WingAction | FlightAction | PilotAction;
