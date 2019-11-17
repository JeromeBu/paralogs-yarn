import { ActionType, getType } from "typesafe-actions";
import { Wing } from "@paralogs/shared";
import { wingsActions } from "./wings.actions";
import { shouldNeverBeCalled, ErrorFromAction } from "../../utils";

interface WingsState {
  readonly isAddWingFormVisible: boolean;
  readonly data: Wing[];
  readonly isSaving: boolean;
  readonly error?: ErrorFromAction;
}

const initialState: WingsState = {
  isAddWingFormVisible: false,
  data: [],
  isSaving: false,
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
    case getType(wingsActions.addWingError):
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
