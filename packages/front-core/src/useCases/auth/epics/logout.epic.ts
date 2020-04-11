import { Epic } from "redux-observable";
import { filter, switchMap, map } from "rxjs/operators";
import { RootState, Dependencies } from "../../../reduxStore";
import { AuthAction, authActions } from "../auth.slice";

export const logoutEpic: Epic<AuthAction, AuthAction, RootState, Dependencies> = (
  action$,
  state$,
  { clientStorage },
) =>
  action$.pipe(
    filter(authActions.logout.match),
    switchMap(() =>
      clientStorage.remove("token").pipe(map(() => authActions.logoutSuccess())),
    ),
  );
