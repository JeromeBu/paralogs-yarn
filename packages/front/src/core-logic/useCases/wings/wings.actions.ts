import { createStandardAction } from "typesafe-actions";
import { Wing } from "@paralogs/shared";
import { ErrorFromAction } from "../../utils";

export const wingsActions = {
  showAddWingForm: createStandardAction("SHOW_ADD_WING_FORM")(),
  hideAddWingForm: createStandardAction("HIDE_ADD_WiNG_FORM")(),

  addWingRequest: createStandardAction("ADD_WING_REQUEST")<Wing>(),
  addWingSuccess: createStandardAction("ADD_WING_SUCCESS")<Wing>(),
  addWingError: createStandardAction("ADD_WING_ERROR")<ErrorFromAction>(),

  retreiveWingsRequest: createStandardAction("RETREIVE_WINGS_REQUEST")(),
  retreiveWingsSuccess: createStandardAction("RETREIVE_WINGS_SUCCESS")<Wing[]>(),
  retreiveWingsError: createStandardAction("RETREIVE_WINGS_ERROR")<ErrorFromAction>(),
};
