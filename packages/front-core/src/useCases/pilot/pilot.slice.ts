import { PilotDTO, UpdatePilotDTO, ValueOf } from "@paralogs/shared";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PilotState = {
  isUpdateFormVisible: boolean;
  isSaving: boolean;
  pilotInformation: PilotDTO | null;
};

const initialState: PilotState = {
  isUpdateFormVisible: false,
  isSaving: false,
  pilotInformation: null,
};

const setPilotInformation = (
  state: PilotState,
  payload: PilotDTO | null,
): PilotState => ({
  ...state,
  isSaving: false,
  pilotInformation: payload,
});

const pilotSlice = createSlice({
  name: "pilot",
  initialState,
  reducers: {
    showUpdateForm: (state): PilotState => ({ ...state, isUpdateFormVisible: true }),
    hideUpdateForm: (state): PilotState => ({ ...state, isUpdateFormVisible: false }),

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updatePilotRequested: (state, action: PayloadAction<UpdatePilotDTO>) => ({
      ...state,
      isSaving: true,
    }),
    updatePilotSucceeded: (
      state: PilotState,
      action: PayloadAction<UpdatePilotDTO>,
    ): PilotState =>
      setPilotInformation(
        state,
        state.pilotInformation && { ...state.pilotInformation, ...action.payload },
      ),
    pilotInformationSet: (
      state: PilotState,
      action: PayloadAction<PilotDTO | null>,
    ): PilotState => setPilotInformation(state, action.payload),
  },
});

export const { actions: pilotActions, reducer: pilotReducer } = pilotSlice;
export type PilotAction = ReturnType<ValueOf<typeof pilotActions>>;
