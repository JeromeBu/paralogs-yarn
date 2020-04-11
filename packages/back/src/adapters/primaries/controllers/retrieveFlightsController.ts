import { retrieveFlightsUseCaseCreator } from "../../../domain/useCases/flights/RetreiveFlightsUseCase";
import { repositories } from "../../secondaries/repositories/repositoryChoice";
import { buildControllerNoValidation } from "../express/controller.builder";

const retrieveFlightsUseCase = retrieveFlightsUseCaseCreator({
  flightRepo: repositories.flight,
});

export const retrieveFlightsController = buildControllerNoValidation({
  useCase: retrieveFlightsUseCase,
});
