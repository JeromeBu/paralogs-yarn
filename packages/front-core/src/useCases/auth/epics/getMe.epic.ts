import { Epic } from "redux-observable";
import { filter, switchMap, map, catchError } from "rxjs/operators";
import { of } from "rxjs";
import { RootState, Dependencies } from "../../../reduxStore";
import { AuthAction, authActions } from "../auth.slice";
import { handleActionError } from "../../../utils";

export const getMeEpic: Epic<AuthAction, AuthAction, RootState, Dependencies> = (
  action$,
  state$,
  { authGateway, clientStorage },
) =>
  action$.pipe(
    filter(authActions.getMeRequested.match),
    switchMap(() => {
      return authGateway.getMe().pipe(
        switchMap(currentUserWithToken => {
          clientStorage.set("token", currentUserWithToken.token);
          return of(currentUserWithToken);
        }),
        map(authActions.authenticationSucceeded),
        catchError(handleActionError(authActions.getMeFailed)),
      );
    }),
  );
