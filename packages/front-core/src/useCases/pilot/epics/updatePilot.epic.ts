import { Epic } from "redux-observable";
import { filter, map, switchMap } from "rxjs/operators";

import { Dependencies, RootState } from "../../../reduxStore";
import { RootAction } from "../../../store/root-action";
import { pilotActions } from "../pilot.slice";

export const updatePilotEpic: Epic<
  RootAction,
  RootAction,
  RootState,
  Dependencies
> = (action$, state$, { pilotGateway }) =>
  action$.pipe(
    filter(pilotActions.updatePilotRequested.match),
    switchMap(({ payload }) =>
      pilotGateway
        .updateUser(payload)
        .pipe(map(() => pilotActions.updatePilotSucceeded(payload))),
    ),
  );
