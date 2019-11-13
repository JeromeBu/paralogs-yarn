import { createStandardAction } from "typesafe-actions";

export const wingsActions = {
  showAddWingForm: createStandardAction("SHOW_ADD_WING_FORM")(),
  hideAddWingForm: createStandardAction("HIDE_ADD_WiNG_FORM")(),
};
