import { Epic } from "redux-observable";
import { filter, map } from "rxjs/operators";

import { Dependencies, RootState } from "../../../reduxStore";
import { RootAction } from "../../../store/root-action";
import { authActions } from "../../auth/auth.slice";
import { pilotActions } from "../pilot.slice";

export const clearPilotInformationEpic: Epic<
  RootAction,
  RootAction,
  RootState,
  Dependencies
> = (action$) =>
  action$.pipe(
    filter(authActions.logoutSucceeded.match),
    map(() => pilotActions.pilotInformationSet(null)),
  );
