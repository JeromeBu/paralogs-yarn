import { APIGatewayEvent } from "aws-lambda";
import { success } from "../lib/response-lib";

export const main = async (event: APIGatewayEvent) => {
  // eslint-disable-next-line no-console
  console.log("DELETE : ", { parameters: event.pathParameters, body: event.body });

  return success(204);
};
