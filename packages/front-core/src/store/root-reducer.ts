import { combineReducers } from "redux";
import { currentUserReducer } from "../useCases/currentUser/currentUser.reducer";
import { flightsReducer } from "../useCases/flights/flights.reducer";
import { wingsReducer } from "../useCases/wings/wings.reducer";

export const rootReducer = combineReducers({
  currentUser: currentUserReducer,
  flights: flightsReducer,
  wings: wingsReducer,
});
