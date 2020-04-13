// import { Future } from "./Future";
//
// describe("Futures", () => {
//   it("transform a promise in a future, map it's value", () => {
//     const a = "voiture";
//     const futureString = Future.of(a);
//     const futureNum = futureString.map(value => value.length);
//     futureNum.map(nbChar => expect(nbChar).toBe(a.length));
//   });
//   it("flatMap values", () => {
//     const a = "yo";
//     Future.of(a)
//       .flatMap(value => Future.of(value.length))
//       .map(num => expect(num).toBe(2));
//   });
// });
