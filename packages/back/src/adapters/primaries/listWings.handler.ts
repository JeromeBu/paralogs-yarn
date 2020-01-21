import { APIGatewayEvent } from "aws-lambda";
import { noCurrentUser } from "../../domain/core/errors";
import { listWingsUseCaseCreator } from "../../domain/useCases/wings/ListWingsUseCase";
import { failure, success } from "../lib/response-lib";
import { dynamoDbWingRepo } from "../secondaries/repo/dynamoDb";

const listWingsUseCase = listWingsUseCaseCreator(dynamoDbWingRepo);

export const main = async (event: APIGatewayEvent) => {
  try {
    const currentUserId = event.requestContext.identity.cognitoIdentityId;
    if (!currentUserId) throw noCurrentUser();

    const wingDTOs = (await listWingsUseCase(currentUserId)).getOrThrow();
    return success(wingDTOs);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Error : `, error);
    return failure({ message: error.message }, error.statusCode);
  }
};
