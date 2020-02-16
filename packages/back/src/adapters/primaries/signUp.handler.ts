import { APIGatewayEvent } from "aws-lambda";
import { noBodyProvided } from "../../domain/core/errors";
import { failure, HttpResponse } from "../lib/response-lib";
import { signUpController } from "./controllers/signUp.controller";

export const main = async (event: APIGatewayEvent): Promise<HttpResponse> => {
  if (!event.body) return failure(noBodyProvided("SignUp params"), 400);
  return signUpController(JSON.parse(event.body));
};
