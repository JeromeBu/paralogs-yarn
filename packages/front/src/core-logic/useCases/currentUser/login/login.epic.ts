import { Epic } from "redux-observable";
import { of } from "rxjs";
import { catchError, filter, map, switchMap } from "rxjs/operators";
import { isActionOf } from "typesafe-actions";
import { RootAction } from "../../../store/root-action";
import { RootState, Dependencies } from "../../../reduxStore";
import { currentUserActions } from "../currentUser.actions";

export const loginEpic: Epic<RootAction, RootAction, RootState, Dependencies> = (
  action$,
  state$,
  { apiGateway },
) =>
  action$.pipe(
    filter(isActionOf(currentUserActions.loginRequest)),
    switchMap(({ payload }) =>
      apiGateway.login(payload).pipe(
        map(currentUserActions.loginSuccess),
        catchError(err => of(currentUserActions.loginError({ message: err.message }))),
      ),
    ),
  );
