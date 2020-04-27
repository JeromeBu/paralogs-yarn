import { Epic } from "redux-observable";
import { catchError, filter, map, switchMap } from "rxjs/operators";
import { RootState, Dependencies } from "../../../reduxStore";
import { wingActions } from "../wings.slice";
import { handleActionError, matchActions } from "../../../utils";
import { authActions } from "../../auth/auth.slice";
import { RootAction } from "../../../store/root-action";

export const retrieveWingsEpic: Epic<RootAction, RootAction, RootState, Dependencies> = (
  action$,
  state$,
  { wingGateway },
) => {
  return action$.pipe(
    filter(
      matchActions(
        wingActions.retrieveWingsRequested,
        authActions.authenticationSucceeded,
      ),
    ),
    switchMap(() =>
      wingGateway
        .retrieveWings()
        .pipe(
          map(wingActions.retrieveWingsSucceeded),
          catchError(handleActionError(wingActions.retrieveWingsFailed)),
        ),
    ),
  );
};
