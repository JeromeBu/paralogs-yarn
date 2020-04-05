import { Epic } from "redux-observable";
import { of } from "rxjs";
import { catchError, filter, map, switchMap } from "rxjs/operators";
import { isActionOf } from "typesafe-actions";
import { wingActions, WingAction } from "../wings.actions";
import { RootState, Dependencies } from "../../../reduxStore";

export const addWingEpic: Epic<WingAction, WingAction, RootState, Dependencies> = (
  action$,
  state$,
  { wingGateway },
) =>
  action$.pipe(
    filter(isActionOf(wingActions.addWingRequest)),
    switchMap(({ payload }) =>
      wingGateway.addWing(payload).pipe(
        map(wingActions.addWingSuccess),
        catchError(err => of(wingActions.addWingError(err))),
      ),
    ),
  );
