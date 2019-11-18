import { Epic } from "redux-observable";
import { of } from "rxjs";
import { catchError, filter, map, switchMap } from "rxjs/operators";
import { isActionOf } from "typesafe-actions";
import { RootState, Dependencies } from "../../../reduxStore";
import { flightActions, FlightActions } from "../flights.actions";

export const retreiveFlightsEpic: Epic<
  FlightActions,
  FlightActions,
  RootState,
  Dependencies
> = (action$, state$, { flightGateway }) =>
  action$.pipe(
    filter(isActionOf(flightActions.retreiveFlightsRequest)),
    switchMap(() =>
      flightGateway.retrieveFlights().pipe(
        map(flightActions.retreiveFlightsSuccess),
        catchError(err =>
          of(flightActions.retreiveFlightsError({ message: err.message })),
        ),
      ),
    ),
  );
