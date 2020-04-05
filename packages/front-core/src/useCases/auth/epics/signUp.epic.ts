import { Epic } from "redux-observable";
import { of } from "rxjs";
import { catchError, filter, map, switchMap } from "rxjs/operators";
import { isActionOf } from "typesafe-actions";
import { RootState, Dependencies } from "../../../reduxStore";
import { authActions, AuthAction } from "../auth.actions";

export const signUpEpic: Epic<AuthAction, AuthAction, RootState, Dependencies> = (
  action$,
  state$,
  { authGateway, clientStorage },
) =>
  action$.pipe(
    filter(isActionOf(authActions.signUpRequest)),
    switchMap(({ payload }) => {
      return authGateway.signUp(payload).pipe(
        switchMap(currentUserWithToken => {
          clientStorage.set("token", currentUserWithToken.token);
          return of(currentUserWithToken);
        }),
        map(authActions.signUpSuccess),
        catchError(err => of(authActions.signUpError(err))),
      );
    }),
  );
