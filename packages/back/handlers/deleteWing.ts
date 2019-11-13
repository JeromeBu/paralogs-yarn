import { APIGatewayEvent } from "aws-lambda";

export const handler = async (event: APIGatewayEvent) => {
  // eslint-disable-next-line no-console
  console.log("DELETE : ", { parameters: event.pathParameters, body: event.body });

  return {
    status: 204,
  };
};
