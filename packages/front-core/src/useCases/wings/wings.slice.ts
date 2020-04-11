import { AddWingDTO, StringError, ValueOf, WingDTO } from "@paralogs/shared";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type WingsState = Readonly<{
  isAddWingFormVisible: boolean;
  data: WingDTO[];
  isSaving: boolean;
  isLoading: boolean;
  error?: StringError;
}>;

const initialState: WingsState = {
  isAddWingFormVisible: false,
  data: [],
  isSaving: false,
  isLoading: false,
};

const setError = (state: WingsState, action: PayloadAction<StringError>): WingsState => ({
  ...state,
  isLoading: false,
  isSaving: false,
  error: action.payload,
});

const wingsSlice = createSlice({
  name: "wings",
  initialState,
  reducers: {
    showAddWingForm: state => ({ ...state, isAddWingFormVisible: true }),
    hideAddWingForm: state => ({ ...state, isAddWingFormVisible: false }),

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    addWingRequest: (state, action: PayloadAction<AddWingDTO>) => ({
      ...state,
      isSaving: true,
    }),
    addWingSuccess: (state, action: PayloadAction<WingDTO>) => ({
      ...state,
      data: [action.payload, ...state.data],
      isSaving: false,
    }),
    addWingError: setError,

    retrieveWingsRequest: state => ({ ...state, isLoading: true }),
    retrieveWingsSuccess: (state, action: PayloadAction<WingDTO[]>) => ({
      ...state,
      data: action.payload,
      isLoading: false,
    }),
    retrieveWingsError: setError,
  },
});

export const { actions: wingActions, reducer: wingsReducer } = wingsSlice;
export type WingAction = ReturnType<ValueOf<typeof wingActions>>;
