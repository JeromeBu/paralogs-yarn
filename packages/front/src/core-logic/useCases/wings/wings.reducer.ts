import { ActionType, getType } from "typesafe-actions";
import { Wing } from "@paralogs/shared";
import { wingsActions } from "./wings.actions";
import { shouldNeverBeCalled, ErrorFromAction } from "../../utils";

interface WingsState {
  readonly isAddWingFormVisible: boolean;
  readonly data: Wing[];
  readonly isSaving: boolean;
  readonly isLoading: boolean;
  readonly error?: ErrorFromAction;
}

const initialState: WingsState = {
  isAddWingFormVisible: false,
  data: [],
  isSaving: false,
  isLoading: false,
};

export const wingsReducer = (
  state: WingsState = initialState,
  action: ActionType<typeof wingsActions>,
): WingsState => {
  switch (action.type) {
    case getType(wingsActions.showAddWingForm):
      return { ...state, isAddWingFormVisible: true };
    case getType(wingsActions.hideAddWingForm):
      return { ...state, isAddWingFormVisible: false };
    case getType(wingsActions.addWingRequest):
      return { ...state, isSaving: true };
    case getType(wingsActions.addWingSuccess):
      return { ...state, data: [...state.data, action.payload], isSaving: false };
    case getType(wingsActions.retreiveWingsRequest):
      return { ...state, isLoading: true };
    case getType(wingsActions.retreiveWingsSuccess):
      return { ...state, data: action.payload, isLoading: false };
    case getType(wingsActions.addWingError):
    case getType(wingsActions.retreiveWingsError):
      return { ...state, error: action.payload };
    default:
      if (
        Object.values(wingsActions)
          .map(getType)
          // eslint-disable-next-line dot-notation
          .includes(action["type"])
      ) {
        shouldNeverBeCalled(action);
      }
      return state;
  }
};
