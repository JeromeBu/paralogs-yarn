import { Epic } from "redux-observable";
import { of } from "rxjs";
import { catchError, filter, map, switchMap } from "rxjs/operators";
import { isActionOf } from "typesafe-actions";
import { RootAction } from "../../../store/root-action";
import { RootState, Dependencies } from "../../../reduxStore";
import { flightActions } from "../flights.actions";

export const retreiveFlightsEpic: Epic<
  RootAction,
  RootAction,
  RootState,
  Dependencies
> = (action$, state$, { apiGateway }) =>
  action$.pipe(
    filter(isActionOf(flightActions.retreiveFlightsRequest)),
    switchMap(() =>
      apiGateway.retrieveFlights().pipe(
        map(flightActions.retreiveFlightsSuccess),
        catchError(err =>
          of(flightActions.retreiveFlightsError({ message: err.message })),
        ),
      ),
    ),
  );
