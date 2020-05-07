import { Left, Right } from "purify-ts";
import { Result } from "./Result";

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
