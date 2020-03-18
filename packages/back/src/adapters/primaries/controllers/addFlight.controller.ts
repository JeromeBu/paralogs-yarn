import { addFlightSchema } from "@paralogs/shared";
import { addFlightUseCaseCreator } from "../../../domain/useCases/flights/AddFlightUseCase";
import { repositories } from "../../secondaries/repositories";
import { buildController, withUserIdAdapter } from "../express/controller.builder";

const addFlightUseCase = addFlightUseCaseCreator({ flightRepo: repositories.flight });

export const addFlightController = buildController({
  useCase: addFlightUseCase,
  validationSchema: addFlightSchema,
  adapter: withUserIdAdapter,
});
