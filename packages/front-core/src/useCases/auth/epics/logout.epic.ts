import { Epic } from "redux-observable";
import { filter, map, switchMap } from "rxjs/operators";

import { Dependencies, RootState } from "../../../reduxStore";
import { AuthAction, authActions } from "../auth.slice";

export const logoutEpic: Epic<
  AuthAction,
  AuthAction,
  RootState,
  Dependencies
> = (action$, state$, { clientStorage }) =>
  action$.pipe(
    filter(authActions.logoutRequested.match),
    switchMap(() =>
      clientStorage
        .remove("token")
        .pipe(map(() => authActions.logoutSucceeded())),
    ),
  );
