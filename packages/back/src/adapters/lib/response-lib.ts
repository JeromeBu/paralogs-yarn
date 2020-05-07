import { Response } from "express";
import { ObjectSchema, Shape } from "yup";
import _ from "lodash";
import { EitherAsync } from "purify-ts";
import { liftPromise } from "purify-ts/EitherAsync";
import { AppError, validationError } from "../../domain/core/errors";
import { LeftAsync, ResultAsync } from "../../domain/core/purifyAdds";

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

export const validateSchema = <T extends object>(
  validationSchema: ObjectSchema<Shape<object, T>>,
  body: any,
): ResultAsync<Shape<object, T>> => {
  if (_.isEmpty(body)) return LeftAsync(validationError("No body was provided"));
  return liftPromise(() => validationSchema.validate(body, { abortEarly: false }));
};

type CallUseCaseParams<P> = {
  useCase: (params: P) => EitherAsync<AppError, unknown>;
  eitherAsyncParams: EitherAsync<AppError, P>;
};

export const callUseCase = <P>({
  useCase,
  eitherAsyncParams,
}: CallUseCaseParams<P>): Promise<HttpResponse> => {
  return eitherAsyncParams
    .chain(useCase)
    .run()
    .then(eitherReturned =>
      eitherReturned
        .map(e => success(e))
        .mapLeft(error => failure(error.message, error.code))
        .extract(),
    );
};

export const sendHttpResponse = (res: Response, httpResponse: HttpResponse) => {
  res.status(httpResponse.statusCode);
  return res.json(httpResponse.body);
};
