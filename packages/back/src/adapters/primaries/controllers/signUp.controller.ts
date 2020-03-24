import { ActualUuidGenerator, signUpSchema } from "@paralogs/shared";
import { signUpUseCaseCreator } from "../../../domain/useCases/auth/SignUpUseCase";
import { ProductionHashAndTokenManager } from "../../secondaries/ProductionHashAndTokenManager";
import { repositories } from "../../secondaries/repositories";
import { buildControllerNoCurrentUser } from "../express/controller.builder";

const signUpUseCase = signUpUseCaseCreator({
  userRepo: repositories.user,
  uuidGenerator: new ActualUuidGenerator(),
  hashAndTokenManager: new ProductionHashAndTokenManager(),
});

export const signUpController = buildControllerNoCurrentUser({
  validationSchema: signUpSchema,
  useCase: signUpUseCase,
});
