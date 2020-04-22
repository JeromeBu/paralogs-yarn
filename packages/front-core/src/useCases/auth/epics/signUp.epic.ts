import { Epic } from "redux-observable";
import { of } from "rxjs";
import { catchError, filter, map, switchMap } from "rxjs/operators";
import { RootState, Dependencies } from "../../../reduxStore";
import { AuthAction, authActions } from "../auth.slice";
import { handleActionError } from "../../../utils";

export const signUpEpic: Epic<AuthAction, AuthAction, RootState, Dependencies> = (
  action$,
  state$,
  { authGateway, clientStorage },
) =>
  action$.pipe(
    filter(authActions.signUpRequest.match),
    switchMap(({ payload }) => {
      return authGateway.signUp(payload).pipe(
        switchMap(currentUserWithToken => {
          clientStorage.set("token", currentUserWithToken.token);
          return of(currentUserWithToken);
        }),
        map(authActions.authenticationSucceed),
        catchError(handleActionError(authActions.signUpError)),
      );
    }),
  );
