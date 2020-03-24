import { addFlightSchema } from "@paralogs/shared";
import { addFlightUseCaseCreator } from "../../../domain/useCases/flights/AddFlightUseCase";
import { repositories } from "../../secondaries/repositories";
import {
  buildControllerWithCurrentUser,
  withUserIdAdapter,
} from "../express/controller.builder";

const addFlightUseCase = addFlightUseCaseCreator({ flightRepo: repositories.flight });

export const addFlightController = buildControllerWithCurrentUser({
  useCase: addFlightUseCase,
  validationSchema: addFlightSchema,
  adapter: withUserIdAdapter,
});
