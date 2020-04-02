import { addWingSchema } from "@paralogs/shared";
import { addWingUseCaseCreator } from "../../../domain/useCases/wings/AddWingUseCase";
import { repositories } from "../../secondaries/repositories/repositoryChoice";
import {
  buildControllerWithCurrentUser,
  withUserIdAdapter,
} from "../express/controller.builder";

const addWingUseCase = addWingUseCaseCreator({
  wingRepo: repositories.wing,
});

export const addWingController = buildControllerWithCurrentUser({
  validationSchema: addWingSchema,
  useCase: addWingUseCase,
  adapter: withUserIdAdapter,
});
