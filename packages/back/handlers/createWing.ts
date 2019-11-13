import { APIGatewayEvent } from "aws-lambda";

export const handler = async (event: APIGatewayEvent) => {
  // eslint-disable-next-line no-console
  console.log("CREATE", { body: event.body });

  return {
    status: 201,
  };
};
