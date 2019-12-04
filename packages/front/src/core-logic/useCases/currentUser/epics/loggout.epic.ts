import { Epic } from "redux-observable";
import { of } from "rxjs";
import { catchError, filter, map, switchMap } from "rxjs/operators";
import { isActionOf } from "typesafe-actions";
import { RootAction } from "../../../store/root-action";
import { RootState, Dependencies } from "../../../reduxStore";
import { currentUserActions } from "../currentUser.actions";

export const loggoutEpic: Epic<RootAction, RootAction, RootState, Dependencies> = (
  action$,
  state$,
  { authGateway: apiGateway },
) =>
  action$.pipe(
    filter(isActionOf(currentUserActions.loggout)),
    switchMap(() =>
      apiGateway.loggout().pipe(
        map(currentUserActions.loggoutSuccess),
        catchError(err => of(currentUserActions.loggoutError(err))),
      ),
    ),
  );
