import { combineEpics } from "redux-observable";
import { signUpEpic } from "../useCases/currentUser/epics/signUp.epic";
import { loginEpic } from "../useCases/currentUser/epics/login.epic";
import { retreiveFlightsEpic } from "../useCases/flights/epics/retreiveFlights.epic";
import { addFlightEpic } from "../useCases/flights/epics/addFlight.epic";
import { getCurrentSessionEpic } from "../useCases/currentUser/epics/getCurrentUserAndSession.epic";
import { loggoutEpic } from "../useCases/currentUser/epics/loggout.epic";
import { addWingEpic } from "../useCases/wings/epics/addWing.epic";
import { retreiveWingsEpic } from "../useCases/wings/epics/retrieveWings.epic";

export const rootEpic = combineEpics<any>(
  signUpEpic,
  loginEpic,
  retreiveFlightsEpic,
  addFlightEpic,
  getCurrentSessionEpic,
  loggoutEpic,
  addWingEpic,
  retreiveWingsEpic,
);
