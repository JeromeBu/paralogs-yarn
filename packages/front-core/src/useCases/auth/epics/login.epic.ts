import { Epic } from "redux-observable";
import { of } from "rxjs";
import { catchError, filter, map, switchMap } from "rxjs/operators";
import { isActionOf } from "typesafe-actions";
import { RootState, Dependencies } from "../../../reduxStore";
import { authActions, AuthAction } from "../auth.actions";

export const loginEpic: Epic<AuthAction, AuthAction, RootState, Dependencies> = (
  action$,
  state$,
  { authGateway, clientStorage },
) =>
  action$.pipe(
    filter(isActionOf(authActions.loginRequest)),
    switchMap(({ payload }) =>
      authGateway.login(payload).pipe(
        switchMap(currentUserWithToken => {
          clientStorage.set("token", currentUserWithToken.token);
          return of(currentUserWithToken);
        }),
        map(authActions.loginSuccess),
        catchError(err => of(authActions.loginError(err))),
      ),
    ),
  );
