import { APIGatewayEvent } from "aws-lambda";
import { Wing } from "@paralogs/shared";
import { createWingUseCaseCreator } from "../../domain/useCases/CreateWingUseCase";
import { noBodyProvided, noCurrentUser } from "../../domain/core/errors";
import { success } from "../lib/response-lib";
import { dynamoDbWingRepo } from "../repo/dynamoDb";

const creatWingUseCase = createWingUseCaseCreator(dynamoDbWingRepo);

export const main = async (event: APIGatewayEvent) => {
  if (!event.body) throw noBodyProvided("Wing");

  const currentUserId = event.requestContext.identity.cognitoIdentityId;
  if (!currentUserId) throw noCurrentUser();

  const wing = JSON.parse(event.body) as Wing;
  wing.userId = currentUserId;

  await creatWingUseCase(wing);

  return success(wing);
};
