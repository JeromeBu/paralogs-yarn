import { ResultAsync } from "@paralogs/back-shared";
import { PilotUuid, WingDTO } from "@paralogs/shared";
import { liftPromise } from "purify-ts/EitherAsync";

import { WingQueries } from "../gateways/WingQueries";

export const retrieveWingsRead = (wingQueries: WingQueries) => (
  currentUserUuid: PilotUuid,
): ResultAsync<WingDTO[]> => {
  return liftPromise(() => wingQueries.findByPilotUuid(currentUserUuid));
};
