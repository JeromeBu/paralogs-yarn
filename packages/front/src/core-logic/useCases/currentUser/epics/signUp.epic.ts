import { Epic } from "redux-observable";
import { of } from "rxjs";
import { catchError, filter, map, switchMap } from "rxjs/operators";
import { isActionOf } from "typesafe-actions";
import { RootState, Dependencies } from "../../../reduxStore";
import { currentUserActions, CurrentUserAction } from "../currentUser.actions";

export const signUpEpic: Epic<
  CurrentUserAction,
  CurrentUserAction,
  RootState,
  Dependencies
> = (action$, state$, { authGateway }) =>
  action$.pipe(
    filter(isActionOf(currentUserActions.signUpRequest)),
    switchMap(({ payload }) => {
      return authGateway.signUp(payload).pipe(
        map(currentUserActions.signUpSuccess),
        catchError(err => of(currentUserActions.signUpError(err))),
      );
    }),
  );
