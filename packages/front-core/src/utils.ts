import { PayloadAction } from "@reduxjs/toolkit";
import { StringError } from "@paralogs/shared";
import { of } from "rxjs";

export const handleActionError = (
  action: (payload: StringError) => PayloadAction<StringError>,
) => (err: any) => {
  if (typeof err === "string") return of(action(err));
  return of(action(err.message));
};
