import { APIGatewayEvent } from "aws-lambda";
import { CreateWingDTO } from "@paralogs/shared";
import { createWingUseCaseCreator } from "../../domain/useCases/wings/CreateWingUseCase";
import { noBodyProvided, noCurrentUser } from "../../domain/core/errors";
import { success, failure, HttpResponse } from "../lib/response-lib";
import { repositories } from "../secondaries/repositories";

const creatWingUseCase = createWingUseCaseCreator(repositories.wing);

export const main = async (event: APIGatewayEvent): Promise<HttpResponse> => {
  if (!event.body) throw noBodyProvided("Wing");

  const currentUserId = event.requestContext.identity.cognitoIdentityId;
  if (!currentUserId) throw noCurrentUser();

  const createWingDTO = JSON.parse(event.body) as CreateWingDTO;

  return (await creatWingUseCase({ ...createWingDTO, userId: currentUserId }))
    .map(wingDTO => success(wingDTO))
    .getOrElse(error => {
      return failure(error, 400);
    });
};
