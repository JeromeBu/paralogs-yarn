import uuid from "uuid";

export const salut = (name: string) => `Hello ${name} ! ${uuid()}`;

export interface Person {
  firstName: string;
  age: number;
}
