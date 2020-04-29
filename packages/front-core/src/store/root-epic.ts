import { combineEpics } from "redux-observable";
import { signUpEpic } from "../useCases/auth/epics/signUp.epic";
import { loginEpic } from "../useCases/auth/epics/login.epic";
import { retrieveFlightsEpic } from "../useCases/flights/epics/retrieveFlightsEpic";
import { addFlightEpic } from "../useCases/flights/epics/addFlight.epic";
import { addWingEpic } from "../useCases/wings/epics/addWing.epic";
import { retrieveWingsEpic } from "../useCases/wings/epics/retrieveWings.epic";
import { getMeEpic } from "../useCases/auth/epics/getMe.epic";
import { logoutEpic } from "../useCases/auth/epics/logout.epic";
import { updateUserEpic } from "../useCases/auth/epics/updateUser.epic";
import { updateWingEpic } from "../useCases/wings/epics/updateWing.epic";

export const rootEpic = combineEpics<any>(
  signUpEpic,
  loginEpic,
  getMeEpic,
  logoutEpic,
  retrieveFlightsEpic,
  addFlightEpic,
  addWingEpic,
  retrieveWingsEpic,
  updateWingEpic,
  updateUserEpic,
);
