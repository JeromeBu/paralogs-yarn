import { Epic } from "redux-observable";
import { catchError, filter, map, switchMap } from "rxjs/operators";
import { RootState, Dependencies } from "../../../reduxStore";
import { FlightAction, flightActions } from "../flights.slice";
import { handleActionError } from "../../../utils";

export const retrieveFlightsEpic: Epic<
  FlightAction,
  FlightAction,
  RootState,
  Dependencies
> = (action$, state$, { flightGateway }) =>
  action$.pipe(
    filter(flightActions.retrieveFlightsRequest.match),
    switchMap(() =>
      flightGateway
        .retrieveFlights()
        .pipe(
          map(flightActions.retrieveFlightsSuccess),
          catchError(handleActionError(flightActions.retrieveFlightsError)),
        ),
    ),
  );
