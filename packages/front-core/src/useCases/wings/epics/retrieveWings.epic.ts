import { Epic } from "redux-observable";
import { catchError, filter, map, switchMap } from "rxjs/operators";
import { RootState, Dependencies } from "../../../reduxStore";
import { WingAction, wingActions } from "../wings.slice";
import { handleActionError } from "../../../utils";

export const retrieveWingsEpic: Epic<WingAction, WingAction, RootState, Dependencies> = (
  action$,
  state$,
  { wingGateway },
) =>
  action$.pipe(
    filter(wingActions.retrieveWingsRequest.match),
    switchMap(() =>
      wingGateway
        .retrieveWings()
        .pipe(
          map(wingActions.retrieveWingsSuccess),
          catchError(handleActionError(wingActions.retrieveWingsError)),
        ),
    ),
  );
