import { Epic } from "redux-observable";
import { of } from "rxjs";
import { catchError, filter, map, switchMap } from "rxjs/operators";
import { RootState, Dependencies } from "../../../reduxStore";
import { AuthAction, authActions } from "../auth.slice";

export const loginEpic: Epic<AuthAction, AuthAction, RootState, Dependencies> = (
  action$,
  state$,
  { authGateway, clientStorage },
) =>
  action$.pipe(
    filter(authActions.loginRequest.match),
    switchMap(({ payload }) =>
      authGateway.login(payload).pipe(
        switchMap(currentUserWithToken => {
          clientStorage.set("token", currentUserWithToken.token);
          return of(currentUserWithToken);
        }),
        map(authActions.setCurrentUserAndAuthToken),
        catchError(err => of(authActions.loginError(err.message))),
      ),
    ),
  );
