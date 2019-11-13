// eslint-disable-next-line
import uuidV4 from "uuid/v4";

export type UUID = string;

export const uuid = uuidV4;

export const isUUID = (str: string): boolean =>
  !!str.match(
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
  );
