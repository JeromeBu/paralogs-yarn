import { createStandardAction, ActionType } from "typesafe-actions";
import { WingDTO, AddWingDTO } from "@paralogs/shared";
import { ErrorFromAction } from "../../utils";

export const wingActions = {
  showAddWingForm: createStandardAction("SHOW_ADD_WING_FORM")(),
  hideAddWingForm: createStandardAction("HIDE_ADD_WING_FORM")(),

  addWingRequest: createStandardAction("ADD_WING_REQUEST")<AddWingDTO>(),
  addWingSuccess: createStandardAction("ADD_WING_SUCCESS")<WingDTO>(),
  addWingError: createStandardAction("ADD_WING_ERROR")<ErrorFromAction>(),

  retreiveWingsRequest: createStandardAction("RETREIVE_WINGS_REQUEST")(),
  retreiveWingsSuccess: createStandardAction("RETREIVE_WINGS_SUCCESS")<WingDTO[]>(),
  retreiveWingsError: createStandardAction("RETREIVE_WINGS_ERROR")<ErrorFromAction>(),
};

export type WingAction = ActionType<typeof wingActions>;
