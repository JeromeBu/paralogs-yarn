import { getType } from "typesafe-actions";
import { WingDTO } from "@paralogs/shared";
import { wingActions, WingAction } from "./wings.actions";
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
    case getType(wingActions.showAddWingForm):
      return { ...state, isAddWingFormVisible: true };
    case getType(wingActions.hideAddWingForm):
      return { ...state, isAddWingFormVisible: false };
    case getType(wingActions.addWingRequest):
      return { ...state, isSaving: true };
    case getType(wingActions.addWingSuccess):
      return { ...state, data: [action.payload, ...state.data], isSaving: false };
    case getType(wingActions.retreiveWingsRequest):
      return { ...state, isLoading: true };
    case getType(wingActions.retreiveWingsSuccess):
      return { ...state, data: action.payload, isLoading: false };
    case getType(wingActions.addWingError):
    case getType(wingActions.retreiveWingsError):
      return { ...state, error: action.payload };
    default:
      shouldNeverBeCalled(action);
      return state;
  }
};
