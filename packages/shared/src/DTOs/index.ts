import * as Yup from "yup";

export * from "./FlightDTOs";
export * from "./WingDTOs";
export * from "./UserDTOs";

export const shapeValidator = <T extends Yup.ObjectSchema<Yup.Shape<object, any>>>(
  schema: T,
  candidate: unknown,
): T extends Yup.ObjectSchema<Yup.Shape<object, infer S>>
  ? Promise<Yup.Shape<object, S>>
  : never => {
  return schema.validate(candidate, { abortEarly: false }) as any;
};
