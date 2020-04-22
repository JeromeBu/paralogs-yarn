// import { Option, fromNullable } from "./Option";

// describe("Options", () => {
//   it("transform a value in an option, and retrieve value", () => {
//     const a = "voiture";
//     const optionA = Option.of(a);
//     expect(optionA.getOrNull()).toBe(a);
//   });
//   it("gets null from option none", () => {
//     const optionA = Option.none();
//     expect(optionA.getOrNull()).toBe(null);
//   });
//   it("turns a value to an option", () => {
//     const vehicles: string[] = ["car"];
//     const spyNone = jest.fn();
//     const optionNone = fromNullable(vehicles.find(el => el === "not fount"));
//     optionNone.map(spyNone);
//     expect(optionNone.getOrNull()).toBe(null);
//     expect(optionNone.getOrElse(() => "something else")).toBe("something else");
//     expect(spyNone).not.toHaveBeenCalled();
//
//     const spySome = jest.fn(<A>(a: A) => a);
//     const optionSome = fromNullable(vehicles.find(el => el === "car"));
//     expect(optionSome.getOrNull()).toBe("car");
//     optionSome.map(spySome).getOrNull();
//     expect(spySome).toHaveBeenCalled();
//   });
//   it("makes it possible to flatMap values", () => {
//     const a = { some: Option.of("someValue"), none: Option.none() };
//     const optionString = Option.of(a).flatMap(({ some }) => some);
//     const optionNone = Option.of(a).flatMap(({ none }) => none);
//     expect(optionString.getOrNull()).toBe("someValue");
//     expect(optionNone.getOrElse(() => "other")).toBe("other");
//   });
//   it("makes it possible to map values", () => {
//     const a = { some: "someValue", none: [0].find(nb => nb === 404) };
//     const optionString = Option.of(a).map(({ some }) => some);
//     const optionNone = Option.of(a).map(({ none }) => none);
//     expect(optionString.getOrNull()).toBe("someValue");
//     expect(optionNone.getOrElse(() => 500)).toBe(500);
//   });
// });
