import { ListWingsUseCase } from "./ListWingsUseCase";
import { InMemoryWingRepo } from "../../infra/repo/inMemory/InMemoryWingRepo";

describe("CreateWing use case", () => {
  let listWingsUseCase: ListWingsUseCase;
  let wingRepo: InMemoryWingRepo; // cannot use WingRepo because need access .wings
  beforeEach(() => {
    wingRepo = new InMemoryWingRepo();
    listWingsUseCase = new ListWingsUseCase(wingRepo);
  });
  it("gets empty array when user has no wings", async () => {
    const wings = await listWingsUseCase.execute("lulu");
    expect(wings).toEqual([]);
  });
  // it("cannot create a wing with the same id", async () => {
  //   const id = "fakeId";
  //   const wing = makeWing({ id });
  //   await listWingsUseCase.execute(wing);

  //   const secondWing = makeWing({ id, model: "LALALA" });
  //   await expect(listWingsUseCase.execute(secondWing)).rejects.toThrowError(
  //     "Wing Id is already used",
  //   );
  // });
});
