import { Epic } from "redux-observable";
import { of } from "rxjs";
import { catchError, filter, map, switchMap } from "rxjs/operators";
import { RootState, Dependencies } from "../../../reduxStore";
import { FlightAction, flightActions } from "../flights.slice";

export const retreiveFlightsEpic: Epic<
  FlightAction,
  FlightAction,
  RootState,
  Dependencies
> = (action$, state$, { flightGateway }) =>
  action$.pipe(
    filter(flightActions.retrieveFlightsRequest.match),
    switchMap(() =>
      flightGateway.retrieveFlights().pipe(
        map(flightActions.retrieveFlightsSuccess),
        catchError(err => of(flightActions.retrieveFlightsError(err.message))),
      ),
    ),
  );
