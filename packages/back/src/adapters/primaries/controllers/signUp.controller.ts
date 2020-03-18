import { ActualUuidGenerator, signUpSchema } from "@paralogs/shared";
import { signUpUseCaseCreator } from "../../../domain/useCases/auth/SignUpUseCase";
import { ProductionHashAndTokenManager } from "../../secondaries/ProductionHashAndTokenManager";
import { repositories } from "../../secondaries/repositories";
import { buildController, identityAdapter } from "../express/controller.builder";

const signUpUseCase = signUpUseCaseCreator({
  userRepo: repositories.user,
  uuidGenerator: new ActualUuidGenerator(),
  hashAndTokenManager: new ProductionHashAndTokenManager(),
});

export const signUpController = buildController({
  validationSchema: signUpSchema,
  useCase: signUpUseCase,
  adapter: identityAdapter,
});
