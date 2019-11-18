import { Epic } from "redux-observable";
import { of } from "rxjs";
import { catchError, filter, map, switchMap } from "rxjs/operators";
import { isActionOf, ActionType } from "typesafe-actions";
import { RootState, Dependencies } from "../../../reduxStore";
import { wingsActions } from "../wings.actions";

type WingAction = ActionType<typeof wingsActions>;

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
