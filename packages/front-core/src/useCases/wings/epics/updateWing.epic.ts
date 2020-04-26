import { Epic } from "redux-observable";
import { catchError, filter, map, switchMap } from "rxjs/operators";
import { Dependencies, RootState } from "../../../reduxStore";
import { wingActions } from "../wings.slice";
import { handleActionError } from "../../../actionsUtils";
import { RootAction } from "../../../store/root-action";

export const updateWingEpic: Epic<RootAction, RootAction, RootState, Dependencies> = (
  action$,
  state$,
  { wingGateway },
) =>
  action$.pipe(
    filter(wingActions.updateWingRequested.match),
    switchMap(({ payload }) =>
      wingGateway
        .updateWing(payload)
        .pipe(
          map(wingActions.updateWingSucceeded),
          catchError(handleActionError(wingActions.updateWingFailed)),
        ),
    ),
  );
