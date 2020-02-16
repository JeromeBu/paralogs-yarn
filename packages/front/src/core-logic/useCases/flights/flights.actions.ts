import { createStandardAction, ActionType } from "typesafe-actions";
import { FlightDTO, AddFlightDTO } from "@paralogs/shared";
import { ErrorFromAction } from "../../utils";

export const flightActions = {
  retreiveFlightsRequest: createStandardAction("RETREIVE_FLIGHTS_REQUEST")(),
  retreiveFlightsSuccess: createStandardAction("RETREIVE_FLIGHTS_SUCCESS")<FlightDTO[]>(),
  retreiveFlightsError: createStandardAction("RETREIVE_FLIGHTS_ERROR")<ErrorFromAction>(),

  addFlightRequest: createStandardAction("ADD_FLIGHT")<AddFlightDTO>(),

  // QUESTION: addedFlight action has been remove, I added {isSaving: false} to retreiveFlightsSuccess reducer
  // not sure if this is the right way

  // addedFlight: createStandardAction("ADDED_FLIGHT")(),

  addFlightFailed: createStandardAction("ADD_FLIGHT_FAILED")<ErrorFromAction>(),

  showAddFlightForm: createStandardAction("SHOW_ADD_FLIGHT_FORM")(),
  hideAddFlightForm: createStandardAction("HIDE_ADD_FLIGHT_FORM")(),
};

export type FlightAction = ActionType<typeof flightActions>;
