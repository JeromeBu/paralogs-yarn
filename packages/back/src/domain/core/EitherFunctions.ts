import { EitherAsync, Left, MaybeAsync, Right } from "purify-ts";
import { Result } from "./purifyAdds";
import { AppError } from "./errors";

export const combineEithers = <T extends { [key in string]: Result<unknown> }>(
  resultsObject: T,
): Result<{ [K in keyof T]: T[K] extends Result<infer X> ? X : never }> => {
  // eslint-disable-next-line
  for (const result of Object.values(resultsObject)) {
    if (result.isLeft()) return Left(result.extract());
  }

  return Right(
    Object.keys(resultsObject).reduce(
      (acc, key) => ({
        ...acc,
        [key]: resultsObject[key].extract(),
      }),
      {} as { [K in keyof T]: T[K] extends Result<infer X> ? X : never },
    ),
  );
};

export const checkNotExists = (
  maybeAsyncValue: MaybeAsync<unknown>,
  error: AppError,
): EitherAsync<AppError, unknown> =>
  EitherAsync(async ({ liftEither: lift }) => {
    const maybe = await maybeAsyncValue.run();
    if (maybe.extract()) return lift(Left(error));
    return lift(Right(null));
  });
