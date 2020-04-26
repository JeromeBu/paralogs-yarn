import { ActionCreatorWithOptionalPayload, PayloadAction } from "@reduxjs/toolkit";
import { StringError } from "@paralogs/shared";
import { of } from "rxjs";
import { RootAction } from "./store/root-action";

export const handleActionError = (
  action: (payload: StringError) => PayloadAction<StringError>,
) => (err: any) => {
  if (typeof err === "string") return of(action(err));
  return of(action(err.message));
};

export const matchActions = (
  ...watchedActions: ActionCreatorWithOptionalPayload<any>[]
) => (action: RootAction) => watchedActions.some(({ match }) => match(action));

export const findAndReplace = <T>(
  arrayToSearch: T[],
  newValue: T,
  condition: (val: T) => boolean,
): T[] => {
  const indexToReplace = arrayToSearch.findIndex(condition);
  return Object.assign([], arrayToSearch, { [indexToReplace]: newValue });
};
