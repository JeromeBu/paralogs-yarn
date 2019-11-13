import { APIGatewayEvent } from "aws-lambda";
import { Wing } from "@paralogs/shared";

export const handler = async (event: APIGatewayEvent) => {
  // eslint-disable-next-line no-console
  console.log(event);
  const response: { status: number; body: Wing[] } = {
    status: 2000,
    body: [],
  };
  return response;
};
