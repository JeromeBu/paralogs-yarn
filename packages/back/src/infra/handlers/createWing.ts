import { APIGatewayEvent } from "aws-lambda";
import { WingDTO } from "@paralogs/shared";
import { createWingUseCaseCreator } from "../../domain/useCases/CreateWingUseCase";
import { noBodyProvided, noCurrentUser } from "../../domain/core/errors";
import { success } from "../lib/response-lib";
import { dynamoDbWingRepo } from "../repo/dynamoDb";

const creatWingUseCase = createWingUseCaseCreator(dynamoDbWingRepo);

export const main = async (event: APIGatewayEvent) => {
  if (!event.body) throw noBodyProvided("Wing");

  const currentUserId = event.requestContext.identity.cognitoIdentityId;
  if (!currentUserId) throw noCurrentUser();

  const wingDto = JSON.parse(event.body) as WingDTO;
  wingDto.userId = currentUserId;

  (await creatWingUseCase(wingDto)).getValueOrThrow();

  return success(wingDto);
};
