import { Epic } from "redux-observable";
import { of } from "rxjs";
import { catchError, filter, map, switchMap } from "rxjs/operators";
import { isActionOf } from "typesafe-actions";

import { Dependencies, RootState } from "../../../reduxStore";
import { RootAction } from "../../../store/root-action";
import { currentUserActions } from "../currentUser.actions";

export const getCurrentSessionEpic: Epic<
  RootAction,
  RootAction,
  RootState,
  Dependencies
> = (action$, state$, { apiGateway }) =>
  action$.pipe(
    filter(isActionOf(currentUserActions.getCurrentSession)),
    switchMap(() =>
      apiGateway.getCurrentSession().pipe(
        map(currentUserActions.getCurrentSessionSuccess),
        catchError(err =>
          of(currentUserActions.getCurrentSessionError({ message: err.message })),
        ),
      ),
    ),
  );
