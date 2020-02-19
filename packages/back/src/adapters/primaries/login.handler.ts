import { APIGatewayEvent } from "aws-lambda";
import { noBodyProvided } from "../../domain/core/errors";
import { failure, HttpResponse } from "../lib/response-lib";
import { loginController } from "./controllers/login.controller";

export const main = async (event: APIGatewayEvent): Promise<HttpResponse> => {
  if (!event.body) return failure(noBodyProvided("Login params").message, 400);
  return loginController(JSON.parse(event.body));
};
