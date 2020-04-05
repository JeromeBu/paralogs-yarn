import { combineReducers } from "redux";
import { authReducer } from "../useCases/auth/auth.reducer";
import { flightsReducer } from "../useCases/flights/flights.reducer";
import { wingsReducer } from "../useCases/wings/wings.reducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  flights: flightsReducer,
  wings: wingsReducer,
});
