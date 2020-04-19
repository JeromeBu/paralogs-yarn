import { Epic } from "redux-observable";
import { catchError, filter, map, switchMap } from "rxjs/operators";
import { RootState, Dependencies } from "../../../reduxStore";
import { WingAction, wingActions } from "../wings.slice";
import { handleActionError } from "../../../utils";

export const addWingEpic: Epic<WingAction, WingAction, RootState, Dependencies> = (
  action$,
  state$,
  { wingGateway },
) =>
  action$.pipe(
    filter(wingActions.addWingRequest.match),
    switchMap(({ payload }) =>
      wingGateway
        .addWing(payload)
        .pipe(
          map(wingActions.addWingSuccess),
          catchError(handleActionError(wingActions.addWingError)),
        ),
    ),
  );
