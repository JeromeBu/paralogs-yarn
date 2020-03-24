import { loginSchema } from "@paralogs/shared";
import { loginUseCaseCreator } from "../../../domain/useCases/auth/LoginUseCase";
import { ProductionHashAndTokenManager } from "../../secondaries/ProductionHashAndTokenManager";
import { repositories } from "../../secondaries/repositories";
import { buildControllerNoCurrentUser } from "../express/controller.builder";

const loginUseCase = loginUseCaseCreator({
  userRepo: repositories.user,
  hashAndTokenManager: new ProductionHashAndTokenManager(),
});

export const loginController = buildControllerNoCurrentUser({
  validationSchema: loginSchema,
  useCase: loginUseCase,
});
