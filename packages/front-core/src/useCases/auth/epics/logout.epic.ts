import { Epic } from "redux-observable";
import { filter, switchMap, map } from "rxjs/operators";
import { isActionOf } from "typesafe-actions";
import { RootState, Dependencies } from "../../../reduxStore";
import { AuthAction, authActions } from "../auth.actions";

export const logoutEpic: Epic<AuthAction, AuthAction, RootState, Dependencies> = (
  action$,
  state$,
  { clientStorage },
) =>
  action$.pipe(
    filter(isActionOf(authActions.logout)),
    switchMap(() =>
      clientStorage.remove("token").pipe(map(() => authActions.logoutSuccess())),
    ),
  );
