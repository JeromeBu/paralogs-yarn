import { Epic } from "redux-observable";
import { of } from "rxjs";
import { catchError, filter, map, switchMap } from "rxjs/operators";
import { isActionOf } from "typesafe-actions";
import { RootAction } from "../../../store/root-action";
import { RootState, Dependencies } from "../../../reduxStore";
import { currentUserActions } from "../currentUser.actions";

export const signUpEpic: Epic<RootAction, RootAction, RootState, Dependencies> = (
  action$,
  state$,
  { apiGateway },
) =>
  action$.pipe(
    filter(isActionOf(currentUserActions.signUpRequest)),
    switchMap(({ payload }) => {
      return apiGateway.signUp(payload).pipe(
        map(currentUserActions.signUpSuccess),
        catchError(err => of(currentUserActions.signUpError({ message: err.message }))),
      );
    }),
  );
