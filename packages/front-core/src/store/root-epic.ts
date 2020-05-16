import { combineEpics } from "redux-observable";

import { getMeEpic } from "../useCases/auth/epics/getMe.epic";
import { loginEpic } from "../useCases/auth/epics/login.epic";
import { logoutEpic } from "../useCases/auth/epics/logout.epic";
import { signUpEpic } from "../useCases/auth/epics/signUp.epic";
import { addFlightEpic } from "../useCases/flights/epics/addFlight.epic";
import { retrieveFlightsEpic } from "../useCases/flights/epics/retrieveFlightsEpic";
import { clearPilotInformationEpic } from "../useCases/pilot/epics/clearPilotInformation.epic";
import { setPilotInformationEpic } from "../useCases/pilot/epics/setPilotInformation.epic";
import { updatePilotEpic } from "../useCases/pilot/epics/updatePilot.epic";
import { addWingEpic } from "../useCases/wings/epics/addWing.epic";
import { retrieveWingsEpic } from "../useCases/wings/epics/retrieveWings.epic";
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
  updatePilotEpic,
  setPilotInformationEpic,
  clearPilotInformationEpic,
);
