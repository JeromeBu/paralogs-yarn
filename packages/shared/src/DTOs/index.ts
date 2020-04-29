import * as Yup from "yup";
import { Result } from "../functionnal/Result";

export * from "./FlightDTOs";
export * from "./WingDTOs";
export * from "./UserDTOs";
export * from "./PilotDTOs";

export const shapeValidator = <T extends Yup.ObjectSchema<Yup.Shape<object, any>>>(
  schema: T,
  candidate: unknown,
): T extends Yup.ObjectSchema<Yup.Shape<object, infer S>>
  ? Promise<Yup.Shape<object, S>>
  : never => {
  return schema.validate(candidate, { abortEarly: false }) as any;
};

export const shapeValidatorResult = <T extends Yup.ObjectSchema<Yup.Shape<object, any>>>(
  schema: T,
  candidate: unknown,
): T extends Yup.ObjectSchema<Yup.Shape<object, infer S>>
  ? Promise<Result<Yup.Shape<object, S>>>
  : never => {
  return schema
    .validate(candidate, { abortEarly: false })
    .then(Result.ok)
    .catch(Result.fail) as any;
};
