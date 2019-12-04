import { Epic } from "redux-observable";
import { of } from "rxjs";
import { catchError, filter, map, switchMap } from "rxjs/operators";
import { isActionOf } from "typesafe-actions";
import { RootState, Dependencies } from "../../../reduxStore";
import { currentUserActions, CurrentUserAction } from "../currentUser.actions";

export const loginEpic: Epic<
  CurrentUserAction,
  CurrentUserAction,
  RootState,
  Dependencies
> = (action$, state$, { authGateway }) =>
  action$.pipe(
    filter(isActionOf(currentUserActions.loginRequest)),
    switchMap(({ payload }) =>
      authGateway.login(payload).pipe(
        map(currentUserActions.loginSuccess),
        catchError(err => of(currentUserActions.loginError(err))),
      ),
    ),
  );
