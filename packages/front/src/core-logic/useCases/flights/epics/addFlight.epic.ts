import { Epic } from "redux-observable";
import { of } from "rxjs";
import { catchError, filter, map, switchMap } from "rxjs/operators";
import { isActionOf } from "typesafe-actions";
import { flightActions, FlightAction } from "../flights.actions";
import { RootState, Dependencies } from "../../../reduxStore";

export const addFlightEpic: Epic<FlightAction, FlightAction, RootState, Dependencies> = (
  action$,
  state$,
  { flightGateway },
) =>
  action$.pipe(
    filter(isActionOf(flightActions.addFlightRequest)),
    switchMap(({ payload }) =>
      flightGateway.addFlight(payload).pipe(
        // map(flightActions.addedFlight),
        map(flightActions.retreiveFlightsRequest),
        catchError(err => of(flightActions.addFlightFailed({ message: err.message }))),
      ),
    ),
  );
