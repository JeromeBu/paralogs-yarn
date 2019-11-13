import { ActionType, getType } from "typesafe-actions";
import { wingsActions } from "./wings.actions";
import { shouldNeverBeCalled } from "../../utils";

interface WingsState {
  isAddWingFormVisible: boolean;
}

const initialState: WingsState = {
  isAddWingFormVisible: false,
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
