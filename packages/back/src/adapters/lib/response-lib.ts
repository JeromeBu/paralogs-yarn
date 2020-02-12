import { Response } from "express";
import { noBodyProvided } from "../../domain/core/errors";

export function success(body: unknown, statusCode = 200) {
  return buildResponse(statusCode, body);
}

export function failure(error: unknown, statusCode?: number) {
  return buildResponse(statusCode ?? 500, error);
}

export interface HttpResponse {
  statusCode: number;
  headers: Record<string, unknown>;
  body: unknown;
}

function buildResponse(statusCode: number, body: unknown): HttpResponse {
  return {
    statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body,
  };
}

export const sendBodyMissingError = (params: { res: Response; expected: string }) => {
  const { res, expected } = params;
  res.status(400);
  return res.json(noBodyProvided(expected).message);
};

export const sendControllerResponse = (
  res: Response,
  controllerResponse: HttpResponse,
) => {
  res.status(controllerResponse.statusCode);
  return res.json(controllerResponse.body);
};
