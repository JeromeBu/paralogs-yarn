import { Either, EitherAsync, Left, Right } from "purify-ts";
import { liftEither } from "purify-ts/EitherAsync";
import { AppError } from "./errors";

export type Result<T> = Either<AppError, T>;
export type ResultAsync<T> = EitherAsync<AppError, T>;

export const RightAsync = <T>(t: T) => liftEither(Right(t));
export const LeftAsync = <T>(t: T) => liftEither(Left(t));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const RightVoid = (param?: any) => Right(undefined);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const RightAsyncVoid = (param?: any): ResultAsync<void> => RightAsync(undefined);
