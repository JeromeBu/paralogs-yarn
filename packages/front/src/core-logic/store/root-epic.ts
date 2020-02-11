import { combineEpics } from "redux-observable";
import { signUpEpic } from "../useCases/auth/epics/signUp.epic";
import { loginEpic } from "../useCases/auth/epics/login.epic";
import { retreiveFlightsEpic } from "../useCases/flights/epics/retreiveFlights.epic";
import { addFlightEpic } from "../useCases/flights/epics/addFlight.epic";
import { addWingEpic } from "../useCases/wings/epics/addWing.epic";
import { retreiveWingsEpic } from "../useCases/wings/epics/retrieveWings.epic";

export const rootEpic = combineEpics<any>(
  signUpEpic,
  loginEpic,
  retreiveFlightsEpic,
  addFlightEpic,
  addWingEpic,
  retreiveWingsEpic,
);
