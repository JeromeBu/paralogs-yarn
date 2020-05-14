import { CurrentUserWithPilotWithAuthToken } from "@paralogs/shared";

import { InMemoryDependencies } from "../../../testUtils";

export const feedWithCurrentUserCreator = (dependencies: InMemoryDependencies) => (
  userDTOWithAuthToken: CurrentUserWithPilotWithAuthToken,
) => {
  dependencies.authGateway.currentUserWithToken$.next(userDTOWithAuthToken);
};
export const feedWithAuthErrorCreator = (dependencies: InMemoryDependencies) => (
  errorMessage: string,
) => {
  dependencies.authGateway.currentUserWithToken$.error(errorMessage);
};
