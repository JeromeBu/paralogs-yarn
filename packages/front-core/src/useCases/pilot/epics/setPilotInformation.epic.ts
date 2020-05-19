import { Epic } from "redux-observable";
import { catchError, filter, map, switchMap } from "rxjs/operators";

import { handleActionError } from "../../../actionsUtils";
import { RootAction } from "../../../store/root-action";
import { RootState } from "../../../store/root-reducer";
import { Dependencies } from "../../../StoreDependencies";
import { authActions } from "../../auth/auth.slice";
import { pilotActions } from "../pilot.slice";

export const setPilotInformationEpic: Epic<
  RootAction,
  RootAction,
  RootState,
  Dependencies
> = (action$, state, { pilotGateway }) =>
  action$.pipe(
    filter(authActions.authenticationSucceeded.match),
    switchMap(() =>
      pilotGateway
        .retrieveCurrentPilot()
        .pipe(
          map(pilotActions.retrievedCurrentPilotSucceeded),
          catchError(
            handleActionError(pilotActions.retrievedCurrentPilotFailed),
          ),
        ),
    ),
  );
