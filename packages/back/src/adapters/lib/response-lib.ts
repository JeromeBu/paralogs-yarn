import { Response } from "express";
import { ObjectSchema, Shape } from "yup";
import { Result } from "@paralogs/shared";
import _ from "lodash";
import { EitherAsync, Left, Right } from "purify-ts";
import { AppError, validationError } from "../../domain/core/errors";

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

export const validateSchema = async <T extends object>(
  validationSchema: ObjectSchema<Shape<object, T>>,
  body: any,
  // ): EitherAsync<ValidationError, Shape<object, T>> => {
): Promise<Result<Shape<object, T>>> => {
  if (_.isEmpty(body)) return Result.fail("No body was provided");
  return validationSchema
    .validate(body, { abortEarly: false })
    .then(Result.ok)
    .catch(error => {
      return Result.fail(error);
    });
};

export const validateSchema2 = <T extends object>(
  validationSchema: ObjectSchema<Shape<object, T>>,
  body: any,
): EitherAsync<AppError, Shape<object, T>> =>
  EitherAsync(async ({ liftEither, fromPromise }) => {
    if (_.isEmpty(body)) return liftEither(Left(validationError("No body was provided")));
    return fromPromise(
      validationSchema
        .validate(body, { abortEarly: false })
        .then(Right)
        .catch(error => Left(error)),
    );
  });

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

type CallUseCaseParams2<P> = {
  useCase: (params: P) => EitherAsync<AppError, unknown>;
  eitherAsyncParams: EitherAsync<AppError, P>;
};

export const callUseCase2 = <P>({
  useCase,
  eitherAsyncParams,
}: CallUseCaseParams2<P>): Promise<HttpResponse> => {
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
