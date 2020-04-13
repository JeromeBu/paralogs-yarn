import { Epic } from "redux-observable";
import { filter, switchMap, map, catchError } from "rxjs/operators";
import { of } from "rxjs";
import { RootState, Dependencies } from "../../../reduxStore";
import { AuthAction, authActions } from "../auth.slice";

export const getMeEpic: Epic<AuthAction, AuthAction, RootState, Dependencies> = (
  action$,
  state$,
  { authGateway, clientStorage },
) =>
  action$.pipe(
    filter(authActions.getMe.match),
    switchMap(() => {
      return authGateway.getMe().pipe(
        switchMap(currentUserWithToken => {
          clientStorage.set("token", currentUserWithToken.token);
          return of(currentUserWithToken);
        }),
        map(authActions.setCurrentUserAndAuthToken),
        catchError(err => of(authActions.getMeError(err.message))),
      );
    }),
  );
