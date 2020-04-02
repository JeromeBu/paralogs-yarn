import { retreiveWingsUseCaseCreator } from "../../../domain/useCases/wings/RetreiveWingsUseCase";
import { repositories } from "../../secondaries/repositories/repositoryChoice";
import { buildControllerNoValidation } from "../express/controller.builder";

const retreiveWingsUseCase = retreiveWingsUseCaseCreator(repositories.wing);

export const retreiveWingsController = buildControllerNoValidation({
  useCase: retreiveWingsUseCase,
});
