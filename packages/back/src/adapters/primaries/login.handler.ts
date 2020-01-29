import { APIGatewayEvent } from "aws-lambda";
import { loginSchema } from "@paralogs/shared";
import { noBodyProvided } from "../../domain/core/errors";
import { success, failure, HttpResponse } from "../lib/response-lib";
import { ProductionHashAndTokenManager } from "../secondaries/ProductionHashAndTokenManager";
import { loginUseCaseCreator } from "../../domain/useCases/auth/LoginUseCase";
import { repositories } from "../secondaries/repositories";

const loginUseCase = loginUseCaseCreator({
  userRepo: repositories.user,
  hashAndTokenManager: new ProductionHashAndTokenManager(),
});

export const main = async (event: APIGatewayEvent): Promise<HttpResponse> => {
  if (!event.body) return failure(noBodyProvided("Login params"), 400);
  const loginParams = await loginSchema.validate(JSON.parse(event.body));

  return (await loginUseCase(loginParams))
    .map(currentUserWithToken => success(currentUserWithToken))
    .getOrElse(error => {
      return failure(error, 400);
    });
};
