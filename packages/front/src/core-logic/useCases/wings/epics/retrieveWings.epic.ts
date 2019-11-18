import { Epic } from "redux-observable";
import { of } from "rxjs";
import { catchError, filter, map, switchMap } from "rxjs/operators";
import { isActionOf } from "typesafe-actions";
import { RootState, Dependencies } from "../../../reduxStore";
import { wingsActions, WingAction } from "../wings.actions";

export const retreiveWingsEpic: Epic<WingAction, WingAction, RootState, Dependencies> = (
  action$,
  state$,
  { wingGateway },
) =>
  action$.pipe(
    filter(isActionOf(wingsActions.retreiveWingsRequest)),
    switchMap(() =>
      wingGateway.retrieveWings().pipe(
        map(wingsActions.retreiveWingsSuccess),
        catchError(err => of(wingsActions.retreiveWingsError({ message: err.message }))),
      ),
    ),
  );
