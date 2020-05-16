import { EventBus, RightAsync } from "@paralogs/back-shared";
import { PilotUuid } from "@paralogs/shared";

import { pilotsUseCases } from "../../../config/useCasesChoice";
import { callUseCase } from "../../lib/response-lib";

export const subscribeToUserSignedUp = (eventBus: EventBus) => {
  eventBus.subscribe("UserSignedUp", async ({ uuid, firstName, lastName }) => {
    await callUseCase({
      useCase: await pilotsUseCases.create,
      eitherAsyncParams: RightAsync({
        uuid: uuid as PilotUuid,
        firstName,
        lastName,
      }),
    });
  });
};
