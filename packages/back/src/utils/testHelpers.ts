import { Result } from "@paralogs/shared";

export const expectResultOk = (result: Result<unknown>) => {
  expect(result.error).toBeUndefined();
  expect(result.isSuccess).toBe(true);
};

export const expectResultFailed = (result: Result<unknown>, errorMessage: string) => {
  expect(result.error).toBe(errorMessage);
};
