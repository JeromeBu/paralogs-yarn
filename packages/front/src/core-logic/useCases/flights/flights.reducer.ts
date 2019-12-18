import { getType } from "typesafe-actions";
import { FlightDTO } from "@paralogs/shared";
import { flightActions, FlightAction } from "./flights.actions";
import { ErrorFromAction, shouldNeverBeCalled } from "../../utils";

interface FlightsState {
  readonly data: FlightDTO[];
  readonly error?: ErrorFromAction;
  readonly isAddFlightFormVisible: boolean;
  readonly isLoading: boolean;
  readonly isSaving: boolean;
}

const initialState: FlightsState = {
  isLoading: false,
  isSaving: false,
  isAddFlightFormVisible: false,
  data: [],
};

export const flightsReducer = (
  state: FlightsState = initialState,
  action: FlightAction,
): FlightsState => {
  switch (action.type) {
    case getType(flightActions.retreiveFlightsRequest):
      return { ...state, isLoading: true };
    case getType(flightActions.retreiveFlightsSuccess):
      return { ...state, data: action.payload, isLoading: false, isSaving: false };
    case getType(flightActions.retreiveFlightsError):
      return { ...state, error: action.payload, isLoading: false };

    case getType(flightActions.addFlightRequest):
      return { ...state, isSaving: true };

    // QUESTION: addedFlight action has been remove, I added {isSaving: false} to retreiveFlightsSuccess
    // not sure if this is the right way

    // case getType(flightActions.addedFlight):
    //   return { ...state, isSaving: false };

    case getType(flightActions.addFlightFailed):
      return { ...state, error: action.payload, isSaving: false };

    case getType(flightActions.showAddFlightForm):
      return { ...state, isAddFlightFormVisible: true };
    case getType(flightActions.hideAddFlightForm):
      return { ...state, isAddFlightFormVisible: false };

    default:
      shouldNeverBeCalled(action);
      return state;
  }
};
