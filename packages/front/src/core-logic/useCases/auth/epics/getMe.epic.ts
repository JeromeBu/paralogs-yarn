import { Epic } from "redux-observable";
import { filter, switchMap, map, catchError } from "rxjs/operators";
import { isActionOf } from "typesafe-actions";
import { of } from "rxjs";
import { AuthAction, authActions } from "../auth.actions";
import { RootState, Dependencies } from "../../../reduxStore";

export const getMeEpic: Epic<AuthAction, AuthAction, RootState, Dependencies> = (
  action$,
  state$,
  { authGateway, clientStorage },
) =>
  action$.pipe(
    filter(isActionOf(authActions.getMe)),
    switchMap(() => {
      return authGateway.getMe().pipe(
        switchMap(currentUserWithToken => {
          clientStorage.set("token", currentUserWithToken.token);
          return of(currentUserWithToken);
        }),
        map(authActions.getMeSuccess),
        catchError(err => of(authActions.getMeError(err))),
      );
    }),
  );
