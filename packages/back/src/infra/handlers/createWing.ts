import { APIGatewayEvent } from "aws-lambda";
import { CreateWingDTO } from "@paralogs/shared";
import { createWingUseCaseCreator } from "../../domain/useCases/CreateWingUseCase";
import { noBodyProvided, noCurrentUser } from "../../domain/core/errors";
import { success } from "../lib/response-lib";
import { dynamoDbWingRepo } from "../repo/dynamoDb";

const creatWingUseCase = createWingUseCaseCreator(dynamoDbWingRepo);

export const main = async (event: APIGatewayEvent) => {
  if (!event.body) throw noBodyProvided("Wing");

  const currentUserId = event.requestContext.identity.cognitoIdentityId;
  if (!currentUserId) throw noCurrentUser();

  const createWingDTO = JSON.parse(event.body) as CreateWingDTO;

  const wingDto = (
    await creatWingUseCase({ ...createWingDTO, userId: currentUserId })
  ).getValueOrThrow();

  return success(wingDto);
};
