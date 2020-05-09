import { combineReducers } from "redux";
import { authReducer } from "../useCases/auth/auth.slice";
import { wingsReducer } from "../useCases/wings/wings.slice";
import { flightsReducer } from "../useCases/flights/flights.slice";
import { pilotReducer } from "../useCases/pilot/pilot.slice";

export const rootReducer = combineReducers({
  auth: authReducer,
  flights: flightsReducer,
  wings: wingsReducer,
  pilot: pilotReducer,
});
