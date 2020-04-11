import { AddFlightDTO, FlightDTO, StringError, ValueOf } from "@paralogs/shared";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type FlightsState = Readonly<{
  data: FlightDTO[];
  error?: StringError;
  isAddFlightFormVisible: boolean;
  isLoading: boolean;
  isSaving: boolean;
}>;

const initialState: FlightsState = {
  isLoading: false,
  isSaving: false,
  isAddFlightFormVisible: false,
  data: [],
};

const setError = (state: FlightsState, action: PayloadAction<StringError>) => ({
  ...state,
  isLoading: false,
  isSaving: false,
  error: action.payload,
});

const flightsSlice = createSlice({
  name: "flights",
  initialState,
  reducers: {
    showAddFlightForm: state => ({ ...state, isAddFlightFormVisible: true }),
    hideAddFlightForm: state => ({ ...state, isAddFlightFormVisible: false }),

    retrieveFlightsRequest: state => ({ ...state, isLoading: true }),
    retrieveFlightsSuccess: (state, action: PayloadAction<FlightDTO[]>) => ({
      ...state,
      data: action.payload,
      isLoading: false,
      isSaving: false,
    }),
    retrieveFlightsError: setError,

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    addFlightRequest: (state, action: PayloadAction<AddFlightDTO>) => ({
      ...state,
      isSaving: true,
    }),
    // QUESTION: addedFlight action has been remove, I added {isSaving: false} to retreiveFlightsSuccess
    // not sure if this is the right way
    addFlightFailed: setError,
  },
});

export const { actions: flightActions, reducer: flightsReducer } = flightsSlice;

export type FlightAction = ReturnType<ValueOf<typeof flightActions>>;
