import { Epic } from "redux-observable";
import { of } from "rxjs";
import { catchError, filter, map, switchMap } from "rxjs/operators";
import { RootState, Dependencies } from "../../../reduxStore";
import { FlightAction, flightActions } from "../flights.slice";

export const addFlightEpic: Epic<FlightAction, FlightAction, RootState, Dependencies> = (
  action$,
  state$,
  { flightGateway },
) =>
  action$.pipe(
    filter(flightActions.addFlightRequest.match),
    switchMap(({ payload }) =>
      flightGateway.addFlight(payload).pipe(
        // map(flightActions.addedFlight),
        map(flightActions.retrieveFlightsRequest),
        catchError(err => of(flightActions.addFlightFailed(err.message))),
      ),
    ),
  );
