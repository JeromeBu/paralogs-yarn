import { retreiveWingsUseCaseCreator } from "../../../domain/useCases/wings/RetreiveWingsUseCase";
import { repositories } from "../../secondaries/repositories/repositoryChoice";
import { buildControllerNoValidation } from "../express/controller.builder";

const retrieveWingsUseCase = retreiveWingsUseCaseCreator(repositories.wing);

export const retrieveWingsController = buildControllerNoValidation({
  useCase: retrieveWingsUseCase,
});
