import { Epic } from "redux-observable";
import { of } from "rxjs";
import { catchError, filter, map, switchMap } from "rxjs/operators";
import { ActionType, isActionOf } from "typesafe-actions";
import { flightActions } from "../flights.actions";
import { RootState, Dependencies } from "../../../reduxStore";

type FlightAction = ActionType<typeof flightActions>;

export const addFlightEpic: Epic<FlightAction, FlightAction, RootState, Dependencies> = (
  action$,
  state$,
  { apiGateway },
) =>
  action$.pipe(
    filter(isActionOf(flightActions.addFlightRequest)),
    switchMap(({ payload }) =>
      apiGateway.addFlight(payload).pipe(
        // map(flightActions.addedFlight),
        map(flightActions.retreiveFlightsRequest),
        catchError(err => of(flightActions.addFlightFailed({ message: err.message }))),
      ),
    ),
  );
