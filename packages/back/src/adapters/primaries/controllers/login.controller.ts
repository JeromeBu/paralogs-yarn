import { loginSchema } from "@paralogs/shared";
import { loginUseCaseCreator } from "../../../domain/useCases/auth/LoginUseCase";
import { ProductionHashAndTokenManager } from "../../secondaries/ProductionHashAndTokenManager";
import { repositories } from "../../secondaries/repositories";
import { buildController, identityAdapter } from "../express/controller.builder";

const loginUseCase = loginUseCaseCreator({
  userRepo: repositories.user,
  hashAndTokenManager: new ProductionHashAndTokenManager(),
});

export const loginController = buildController({
  validationSchema: loginSchema,
  useCase: loginUseCase,
  adapter: identityAdapter,
});
