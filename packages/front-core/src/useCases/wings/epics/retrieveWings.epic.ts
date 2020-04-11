import { Epic } from "redux-observable";
import { of } from "rxjs";
import { catchError, filter, map, switchMap } from "rxjs/operators";
import { RootState, Dependencies } from "../../../reduxStore";
import { WingAction, wingActions } from "../wings.slice";

export const retreiveWingsEpic: Epic<WingAction, WingAction, RootState, Dependencies> = (
  action$,
  state$,
  { wingGateway },
) =>
  action$.pipe(
    filter(wingActions.retrieveWingsRequest.match),
    switchMap(() =>
      wingGateway.retrieveWings().pipe(
        map(wingActions.retrieveWingsSuccess),
        catchError(err => of(wingActions.retrieveWingsError(err))),
      ),
    ),
  );
