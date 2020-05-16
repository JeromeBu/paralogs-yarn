import { Epic } from "redux-observable";
import { catchError, filter, map, switchMap } from "rxjs/operators";

import { handleActionError, matchActions } from "../../../actionsUtils";
import { Dependencies, RootState } from "../../../reduxStore";
import { RootAction } from "../../../store/root-action";
import { authActions } from "../../auth/auth.slice";
import { wingActions } from "../wings.slice";

export const retrieveWingsEpic: Epic<
  RootAction,
  RootAction,
  RootState,
  Dependencies
> = (action$, state$, { wingGateway }) => {
  return action$.pipe(
    filter(
      matchActions(
        wingActions.retrieveWingsRequested,
        authActions.authenticationSucceeded,
      ),
    ),
    switchMap(() =>
      wingGateway
        .retrieveWings()
        .pipe(
          map(wingActions.retrieveWingsSucceeded),
          catchError(handleActionError(wingActions.retrieveWingsFailed)),
        ),
    ),
  );
};
