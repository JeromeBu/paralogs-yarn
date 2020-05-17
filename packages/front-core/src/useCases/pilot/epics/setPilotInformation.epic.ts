import { Epic } from "redux-observable";
import { filter, map } from "rxjs/operators";

import { RootState } from "../../../store/root-reducer";
import { RootAction } from "../../../store/root-action";
import { Dependencies } from "../../../StoreDependencies";
import { authActions } from "../../auth/auth.slice";
import { pilotActions } from "../pilot.slice";

export const setPilotInformationEpic: Epic<
  RootAction,
  RootAction,
  RootState,
  Dependencies
> = (action$) =>
  action$.pipe(
    filter(authActions.authenticationSucceeded.match),
    map(({ payload }) =>
      pilotActions.pilotInformationSet(payload.pilotInformation),
    ),
  );
