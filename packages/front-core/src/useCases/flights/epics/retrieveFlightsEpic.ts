import { Epic } from "redux-observable";
import { catchError, filter, map, switchMap } from "rxjs/operators";
import { RootState, Dependencies } from "../../../reduxStore";
import { flightActions } from "../flights.slice";
import { handleActionError, matchActions } from "../../../utils";
import { authActions } from "../../auth/auth.slice";
import { RootAction } from "../../../store/root-action";

export const retrieveFlightsEpic: Epic<
  RootAction,
  RootAction,
  RootState,
  Dependencies
> = (action$, state$, { flightGateway }) =>
  action$.pipe(
    filter(
      matchActions(
        flightActions.retrieveFlightsRequest,
        authActions.authenticationSucceed,
      ),
    ),
    switchMap(() =>
      flightGateway
        .retrieveFlights()
        .pipe(
          map(flightActions.retrieveFlightsSuccess),
          catchError(handleActionError(flightActions.retrieveFlightsError)),
        ),
    ),
  );
