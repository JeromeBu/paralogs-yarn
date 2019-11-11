import uuid from "uuid";

export const salut = (name: string) => `Hello ${name} ! ${uuid()}`;

export interface Person {
  firstName: string;
  age: number;
}

// console.log(salut("Steevy wonder ! "));

export const trucInutile = "hey";
