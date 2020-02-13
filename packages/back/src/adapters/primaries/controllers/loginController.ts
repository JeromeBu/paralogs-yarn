import { loginSchema, shapeValidator } from "@paralogs/shared";
import { HttpResponse, success, failure } from "../../lib/response-lib";
import { ProductionHashAndTokenManager } from "../../secondaries/ProductionHashAndTokenManager";
import { repositories } from "../../secondaries/repositories";
import { loginUseCaseCreator } from "../../../domain/useCases/auth/LoginUseCase";

const loginUseCase = loginUseCaseCreator({
  userRepo: repositories.user,
  hashAndTokenManager: new ProductionHashAndTokenManager(),
});

export const loginController = async (body: object): Promise<HttpResponse> => {
  try {
    const loginParams = await shapeValidator(loginSchema, body);

    return (await loginUseCase(loginParams))
      .map(currentUserWithToken => success(currentUserWithToken))
      .getOrElse(error => {
        return failure(error, 400);
      });
  } catch (error) {
    return failure(error.errors ?? error, 400);
  }
};
