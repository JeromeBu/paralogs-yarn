import * as Yup from "yup";

export * from "./FlightDTOs";
export * from "./WingDTOs";
export * from "./UserDTOs";

// Not used, need to fix typings first:
export const shapeValidator = <
  S extends object /* TODO:  need to infer S */,
  T extends Yup.ObjectSchema<Yup.Shape<object, S>>
>(
  schema: T,
  candidate: unknown,
): Promise<Yup.Shape<object, S>> => {
  return schema.validate(candidate, { abortEarly: false });
};
