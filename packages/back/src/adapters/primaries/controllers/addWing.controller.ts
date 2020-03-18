import { addWingSchema } from "@paralogs/shared";
import { addWingUseCaseCreator } from "../../../domain/useCases/wings/AddWingUseCase";
import { repositories } from "../../secondaries/repositories";
import { buildController, withUserIdAdapter } from "../express/controller.builder";

const addWingUseCase = addWingUseCaseCreator({
  wingRepo: repositories.wing,
});

export const addWingController = buildController({
  validationSchema: addWingSchema,
  useCase: addWingUseCase,
  adapter: withUserIdAdapter,
});
