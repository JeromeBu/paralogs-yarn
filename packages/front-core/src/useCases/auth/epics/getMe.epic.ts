import { Epic } from "redux-observable";
import { of } from "rxjs";
import { catchError, filter, map, switchMap } from "rxjs/operators";

import { handleActionError } from "../../../actionsUtils";
import { Dependencies, RootState } from "../../../reduxStore";
import { AuthAction, authActions } from "../auth.slice";

export const getMeEpic: Epic<
  AuthAction,
  AuthAction,
  RootState,
  Dependencies
> = (action$, state$, { authGateway, clientStorage }) =>
  action$.pipe(
    filter(authActions.getMeRequested.match),
    switchMap(() => {
      return authGateway.getMe().pipe(
        switchMap((currentUserWithToken) => {
          clientStorage.set("token", currentUserWithToken.token);
          return of(currentUserWithToken);
        }),
        map(authActions.authenticationSucceeded),
        catchError(handleActionError(authActions.getMeFailed)),
      );
    }),
  );
