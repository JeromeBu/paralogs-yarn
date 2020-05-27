declare namespace Express {
  export interface Request {
    currentUserUuid: import("@paralogs/shared").PilotUuid;
  }
}
