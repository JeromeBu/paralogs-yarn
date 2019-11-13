import { APIGatewayEvent } from "aws-lambda";

export const handler = async (event: APIGatewayEvent) => {
  // eslint-disable-next-line no-console
  console.log(event);

  return {
    status: 200,
    body: "Hello world",
  };
};
