import { APIGatewayEvent } from "aws-lambda";
import { noBodyProvided } from "../../domain/core/errors";
import { failure, HttpResponse } from "../lib/response-lib";
import { loginController } from "./controllers/loginController";

export const main = async (event: APIGatewayEvent): Promise<HttpResponse> => {
  if (!event.body) return failure(noBodyProvided("Login params"), 400);
  return loginController(JSON.parse(event.body));
};
