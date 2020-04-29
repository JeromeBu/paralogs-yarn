import { Epic } from "redux-observable";
import { filter, map } from "rxjs/operators";
import { RootAction } from "../../../store/root-action";
import { Dependencies, RootState } from "../../../reduxStore";
import { pilotActions } from "../pilote.slice";
import { authActions } from "../../auth/auth.slice";

export const setPilotInformationEpic: Epic<
  RootAction,
  RootAction,
  RootState,
  Dependencies
> = action$ =>
  action$.pipe(
    filter(authActions.authenticationSucceeded.match),
    map(({ payload }) => pilotActions.pilotInformationSet(payload.pilotInformation)),
  );
