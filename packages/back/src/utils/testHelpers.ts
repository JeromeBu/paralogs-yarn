import { Result as OldResult } from "@paralogs/shared";
import { Result } from "../domain/core/Result";

export const expectOldResultOk = (result: OldResult<unknown>) => {
  expect(result.error).toBeUndefined();
  expect(result.isSuccess).toBe(true);
};

export const expectRight = (result: Result<unknown>) => {
  result.ifLeft(error => {
    expect(error.message).toBeUndefined();
  });
  expect(result.isRight()).toBe(true);
};

export const expectEitherToMatchError = (
  either: Result<any>,
  expectedErrorMessage: string,
) => {
  expect((either.extract() as any).message).toMatch(expectedErrorMessage);
};
