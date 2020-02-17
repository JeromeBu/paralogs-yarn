import { getType } from "typesafe-actions";
import { WingDTO } from "@paralogs/shared";
import { wingsActions, WingAction } from "./wings.actions";
import { shouldNeverBeCalled, ErrorFromAction } from "../../utils";

type WingsState = Readonly<{
  isAddWingFormVisible: boolean;
  data: WingDTO[];
  isSaving: boolean;
  isLoading: boolean;
  error?: ErrorFromAction;
}>;

const initialState: WingsState = {
  isAddWingFormVisible: false,
  data: [],
  isSaving: false,
  isLoading: false,
};

export const wingsReducer = (
  state: WingsState = initialState,
  action: WingAction,
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
      shouldNeverBeCalled(action);
      return state;
  }
};
