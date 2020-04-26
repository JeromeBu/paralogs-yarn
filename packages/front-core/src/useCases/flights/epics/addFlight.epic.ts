import { Epic } from "redux-observable";
import { catchError, filter, map, switchMap } from "rxjs/operators";
import { RootState, Dependencies } from "../../../reduxStore";
import { FlightAction, flightActions } from "../flights.slice";
import { handleActionError } from "../../../actionsUtils";

export const addFlightEpic: Epic<FlightAction, FlightAction, RootState, Dependencies> = (
  action$,
  state$,
  { flightGateway },
) =>
  action$.pipe(
    filter(flightActions.addFlightRequested.match),
    switchMap(({ payload }) =>
      flightGateway.addFlight(payload).pipe(
        // map(flightActions.addedFlight),
        map(flightActions.retrieveFlightsRequested),
        catchError(handleActionError(flightActions.addFlightFailed)),
      ),
    ),
  );
