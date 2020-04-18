import { Response } from "express";
import { ObjectSchema, Shape } from "yup";
import { Result } from "@paralogs/shared";
import { noBodyProvided } from "../../domain/core/errors";

export const success = (body: unknown, statusCode = 200) =>
  buildResponse(statusCode, body);

export const failure = (errorMessage: string, statusCode?: number) =>
  buildResponse(statusCode ?? 500, { message: errorMessage });

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
  return res.json({ message: noBodyProvided(expected).message });
};

export const validateSchema = <T extends object>(
  validationSchema: ObjectSchema<Shape<object, T>>,
  body: any,
) =>
  validationSchema
    .validate(body, { abortEarly: false })
    .then(Result.ok)
    .catch(error => Result.fail<Shape<object, T>>(error));

type CallUseCaseParams<P> = {
  useCase: (params: P) => Promise<Result<unknown>>;
  resultParams: Result<P>;
};

export const callUseCase = <P>({
  useCase,
  resultParams,
}: CallUseCaseParams<P>): Promise<HttpResponse> => {
  return resultParams
    .flatMapAsync(async params => {
      const resultDataReturned = await useCase(params);
      return resultDataReturned.map(success);
    })
    .then(resultHttpResponse =>
      resultHttpResponse.getOrElse(error => failure(error, 400)),
    );
};

export const sendHttpResponse = (res: Response, httpResponse: HttpResponse) => {
  res.status(httpResponse.statusCode);
  return res.json(httpResponse.body);
};
