import { Epic } from "redux-observable";
import { of } from "rxjs";
import { catchError, filter, map, switchMap } from "rxjs/operators";
import { isActionOf, ActionType } from "typesafe-actions";
import { RootAction } from "../../../store/root-action";
import { RootState, Dependencies } from "../../../reduxStore";
import { wingsActions } from "../wings.actions";

type WingAction = ActionType<typeof wingsActions>;

export const retreiveWingsEpic: Epic<RootAction, WingAction, RootState, Dependencies> = (
  action$,
  state$,
  { apiGateway },
) =>
  action$.pipe(
    filter(isActionOf(wingsActions.retreiveWingsRequest)),
    switchMap(() =>
      apiGateway.retrieveWings().pipe(
        map(wingsActions.retreiveWingsSuccess),
        catchError(err => of(wingsActions.retreiveWingsError({ message: err.message }))),
      ),
    ),
  );
