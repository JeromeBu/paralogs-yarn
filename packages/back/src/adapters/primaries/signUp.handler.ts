import { APIGatewayEvent } from "aws-lambda";
import { signUpSchema, ActualUuidGenerator } from "@paralogs/shared";
import { noBodyProvided } from "../../domain/core/errors";
import { success, failure, HttpResponse } from "../lib/response-lib";
import { dynamoDbUserRepo } from "../secondaries/repo/dynamoDb";
import { signUpUseCaseCreator } from "../../domain/useCases/auth/SignUpUseCase";
import { ProductionHashAndTokenManager } from "../secondaries/ProductionHashAndTokenManager";

const signUpUseCase = signUpUseCaseCreator({
  userRepo: dynamoDbUserRepo,
  uuidGenerator: new ActualUuidGenerator(),
  hashAndTokenManager: new ProductionHashAndTokenManager(),
});

export const main = async (event: APIGatewayEvent): Promise<HttpResponse> => {
  if (!event.body) return failure(noBodyProvided("SignUp params"), 400);
  const signUpParams = await signUpSchema.validate(JSON.parse(event.body));

  return (await signUpUseCase(signUpParams))
    .map(currentUserWithToken => success(currentUserWithToken))
    .getOrElse(error => {
      return failure(error, 400);
    });
};
