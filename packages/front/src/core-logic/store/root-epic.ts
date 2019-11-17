import { combineEpics } from "redux-observable";
import { signUpEpic } from "../useCases/currentUser/signUp/signUp.epic";
import { loginEpic } from "../useCases/currentUser/login/login.epic";
import { retreiveFlightsEpic } from "../useCases/flights/epics/retreiveFlights.epic";
import { addFlightEpic } from "../useCases/flights/epics/addFlight.epic";
import { getCurrentSessionEpic } from "../useCases/currentUser/getCurrentSession/getCurrentSession.epic";
import { loggoutEpic } from "../useCases/currentUser/loggout/loggout.epic";
import { addWingEpic } from "../useCases/wings/epics/addWing.epic";

export const rootEpic = combineEpics<any>(
  signUpEpic,
  loginEpic,
  retreiveFlightsEpic,
  addFlightEpic,
  getCurrentSessionEpic,
  loggoutEpic,
  addWingEpic,
);
