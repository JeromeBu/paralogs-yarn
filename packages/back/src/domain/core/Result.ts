import { Either, EitherAsync, Right } from "purify-ts";
import { AppError } from "./errors";

export type Result<T> = Either<AppError, T>;
export type ResultAsync<T> = EitherAsync<AppError, T>;
export const RightVoid = () => Right(undefined);
