import { APIGatewayEvent } from "aws-lambda";
import { Wing } from "@paralogs/shared";
import { CreateWingUseCase } from "../../domain/useCases/CreateWingUseCase";
import { noBodyProvided, noCurrentUser } from "../../domain/core/errors";
import { success } from "../lib/response-lib";
import { dynamoDbWingRepo } from "../repo/dynamoDb";

const creatWingUseCase = new CreateWingUseCase(dynamoDbWingRepo);

export const main = async (event: APIGatewayEvent) => {
  if (!event.body) throw noBodyProvided("Wing");

  const currentUserId = event.requestContext.identity.cognitoIdentityId;
  if (!currentUserId) throw noCurrentUser();

  const wing = JSON.parse(event.body) as Wing;
  wing.userId = currentUserId;

  await creatWingUseCase.execute(wing);

  return success(wing);
};
