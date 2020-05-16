import { Epic } from "redux-observable";
import { catchError, filter, map, switchMap } from "rxjs/operators";

import { handleActionError } from "../../../actionsUtils";
import { Dependencies, RootState } from "../../../reduxStore";
import { RootAction } from "../../../store/root-action";
import { wingActions } from "../wings.slice";

export const addWingEpic: Epic<
  RootAction,
  RootAction,
  RootState,
  Dependencies
> = (action$, state$, { wingGateway }) =>
  action$.pipe(
    filter(wingActions.addWingRequested.match),
    switchMap(({ payload }) =>
      wingGateway
        .addWing(payload)
        .pipe(
          map(wingActions.addWingSucceeded),
          catchError(handleActionError(wingActions.addWingFailed)),
        ),
    ),
  );
