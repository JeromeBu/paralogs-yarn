import { retrieveWingsUseCaseCreator } from "../../../domain/useCases/wings/RetrieveWingsUseCase";
import { repositories } from "../../secondaries/repositories/repositoryChoice";
import { buildControllerNoValidation } from "../express/controller.builder";

const retrieveWingsUseCase = retrieveWingsUseCaseCreator(repositories.wing);

export const retrieveWingsController = buildControllerNoValidation({
  useCase: retrieveWingsUseCase,
});
