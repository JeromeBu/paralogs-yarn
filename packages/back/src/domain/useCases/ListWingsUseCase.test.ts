import { Wing } from "@paralogs/shared";
import { InMemoryWingRepo } from "../../infra/repo/inMemory/InMemoryWingRepo";
import { makeWing } from "../testBuilders/builders";
import { CreateWingUseCase } from "./CreateWingUseCase";
import { ListWingsUseCase } from "./ListWingsUseCase";

describe("wings retreival", () => {
  let listWingsUseCase: ListWingsUseCase;
  let wingRepo: InMemoryWingRepo; // cannot use WingRepo because need access .wings

  beforeEach(() => {
    wingRepo = new InMemoryWingRepo();
    listWingsUseCase = new ListWingsUseCase(wingRepo);
  });

  describe("user has no wings", () => {
    it("returns no wing", async () => {
      const wings = await listWingsUseCase.execute("lulu");
      expect(wings).toEqual([]);
    });
  });

  describe("user has some wings", () => {
    let createWingUseCase: CreateWingUseCase;
    it("retreives only the user's wings", async () => {
      createWingUseCase = new CreateWingUseCase(wingRepo);
      const userId = "fakeUserId";

      const wing1 = await createWing({ model: "Wing 1", userId });
      const wing2 = await createWing({ model: "Wing 2", userId });
      await createWing({ model: "Wing 2", userId: "otherUser" });

      const retreivedWings = await listWingsUseCase.execute(userId);

      expect(retreivedWings).toEqual([wing1, wing2]);
    });

    const createWing = async (wingParams: Partial<Wing>) =>
      createWingUseCase.execute(makeWing(wingParams));
  });
});
