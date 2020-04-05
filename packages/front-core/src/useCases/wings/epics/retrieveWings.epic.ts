import { Epic } from "redux-observable";
import { of } from "rxjs";
import { catchError, filter, map, switchMap } from "rxjs/operators";
import { isActionOf } from "typesafe-actions";
import { RootState, Dependencies } from "../../../reduxStore";
import { wingActions, WingAction } from "../wings.actions";

export const retreiveWingsEpic: Epic<WingAction, WingAction, RootState, Dependencies> = (
  action$,
  state$,
  { wingGateway },
) =>
  action$.pipe(
    filter(isActionOf(wingActions.retreiveWingsRequest)),
    switchMap(() =>
      wingGateway.retrieveWings().pipe(
        map(wingActions.retreiveWingsSuccess),
        catchError(err => of(wingActions.retreiveWingsError(err))),
      ),
    ),
  );
