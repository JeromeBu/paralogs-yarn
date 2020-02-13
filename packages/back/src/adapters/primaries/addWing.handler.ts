import { APIGatewayEvent } from "aws-lambda";
import { AddWingDTO } from "@paralogs/shared";
import { addWingUseCaseCreator } from "../../domain/useCases/wings/AddWingUseCase";
import { noBodyProvided, noCurrentUser } from "../../domain/core/errors";
import { success, failure, HttpResponse } from "../lib/response-lib";
import { repositories } from "../secondaries/repositories";

const addWingUseCase = addWingUseCaseCreator(repositories.wing);

export const main = async (event: APIGatewayEvent): Promise<HttpResponse> => {
  if (!event.body) throw noBodyProvided("Wing");

  const currentUserId = event.requestContext.identity.cognitoIdentityId;
  if (!currentUserId) throw noCurrentUser();

  const addWingDTO = JSON.parse(event.body) as AddWingDTO;

  return (await addWingUseCase({ ...addWingDTO, userId: currentUserId }))
    .map(wingDTO => success(wingDTO))
    .getOrElse(error => {
      return failure(error, 400);
    });
};
