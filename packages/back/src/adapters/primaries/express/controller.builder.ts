import { Result } from "@paralogs/shared";
import { ObjectSchema, Shape } from "yup";
import { UserEntity } from "../../../domain/entities/UserEntity";
import { failure, HttpResponse, success } from "../../lib/response-lib";

export const identityAdapter = <T>(t: T) => t;

export const withUserIdAdapter = <T>(params: T, currentUser: UserEntity) => ({
  ...params,
  userId: currentUser.id,
});

type Adapter<T extends object, U extends object> = (
  param: T,
  currentUser: UserEntity,
) => Parameters<BuildControllerConfigWithCurrentUser<T, U>["useCase"]>[0];

type BuildControllerConfigWithCurrentUser<T extends object, U extends object> = {
  validationSchema: ObjectSchema<Shape<object, T>>;
  useCase: (params: U) => Promise<Result<unknown>>;
  adapter: Adapter<T, U>;
};

export const buildControllerWithCurrentUser = <T extends object, U extends object>({
  validationSchema,
  useCase,
  adapter,
}: BuildControllerConfigWithCurrentUser<T, U>): ((
  body: object,
  currentUser: UserEntity,
) => Promise<HttpResponse>) => {
  return async (body, currentUser) => {
    const resultParams = await validationSchema
      .validate(body, { abortEarly: false })
      .then(Result.ok)
      .catch(error => Result.fail<Shape<object, T>>(error));

    return resultParams
      .flatMapAsync(async params => {
        const resultDataReturned = await useCase(adapter(params, currentUser));
        return resultDataReturned.map(success);
      })
      .then(resultHttpResponse =>
        resultHttpResponse.getOrElse(error => failure(error, 400)),
      );
  };
};

type BuildControllerConfigNoCurrentUser<T extends object> = {
  validationSchema: ObjectSchema<Shape<object, T>>;
  useCase: (params: T) => Promise<Result<unknown>>;
};

export const buildControllerNoCurrentUser = <T extends object>({
  validationSchema,
  useCase,
}: BuildControllerConfigNoCurrentUser<T>): ((body: object) => Promise<HttpResponse>) => {
  return async body => {
    const resultParams = await validationSchema
      .validate(body, { abortEarly: false })
      .then(Result.ok)
      .catch(error => Result.fail<Shape<object, T>>(error));

    return resultParams
      .flatMapAsync(async params => {
        const resultDataReturned = await useCase(params);
        return resultDataReturned.map(success);
      })
      .then(resultHttpResponse =>
        resultHttpResponse.getOrElse(error => failure(error, 400)),
      );
  };
};

interface NoValidationControllerParams {
  useCase: (currentUser: UserEntity) => Promise<unknown>;
}

export const buildControllerNoValidation = ({
  useCase,
}: NoValidationControllerParams): ((
  currentUser: UserEntity,
) => Promise<HttpResponse>) => {
  return async currentUser => {
    const resultData = await useCase(currentUser);
    return success(resultData);
  };
};
