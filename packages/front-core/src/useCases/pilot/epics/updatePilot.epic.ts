import { Epic } from "redux-observable";
import { filter, map, switchMap } from "rxjs/operators";

import { RootAction } from "../../../store/root-action";
import { RootState } from "../../../store/root-reducer";
import { Dependencies } from "../../../StoreDependencies";
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
