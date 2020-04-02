import { retreiveFlightsUseCaseCreator } from "../../../domain/useCases/flights/RetreiveFlightsUseCase";
import { repositories } from "../../secondaries/repositories/repositoryChoice";
import { buildControllerNoValidation } from "../express/controller.builder";

const retreiveFlightsUseCase = retreiveFlightsUseCaseCreator({
  flightRepo: repositories.flight,
});

export const retreiveFlightsController = buildControllerNoValidation({
  useCase: retreiveFlightsUseCase,
});
