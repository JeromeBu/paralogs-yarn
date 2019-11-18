import { Epic } from "redux-observable";
import { of } from "rxjs";
import { catchError, filter, map, switchMap } from "rxjs/operators";
import { ActionType, isActionOf } from "typesafe-actions";
import { wingsActions } from "../wings.actions";
import { RootState, Dependencies } from "../../../reduxStore";

type WingAction = ActionType<typeof wingsActions>;

export const addWingEpic: Epic<WingAction, WingAction, RootState, Dependencies> = (
  action$,
  state$,
  { wingGateway },
) =>
  action$.pipe(
    filter(isActionOf(wingsActions.addWingRequest)),
    switchMap(({ payload }) =>
      wingGateway.addWing(payload).pipe(
        map(wingsActions.addWingSuccess),
        catchError(err => of(wingsActions.addWingError({ message: err.message }))),
      ),
    ),
  );
