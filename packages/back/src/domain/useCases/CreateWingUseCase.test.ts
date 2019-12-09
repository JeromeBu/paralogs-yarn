import { CreateWingUseCase } from "./CreateWingUseCase";
import { InMemoryWingRepo } from "../../infra/repo/inMemory/InMemoryWingRepo";
import { makeWing } from "../testBuilders/builders";

describe("wing creation", () => {
  let createWingUseCase: CreateWingUseCase;
  let wingRepo: InMemoryWingRepo; // cannot use WingRepo because need access .wings
  beforeEach(() => {
    wingRepo = new InMemoryWingRepo();
    createWingUseCase = new CreateWingUseCase(wingRepo);
  });
  describe("a wing already exists with the same identity", () => {
    it("cannot create a wing with the same id", async () => {
      const id = "fakeId";
      const wing = makeWing({ id });
      await createWingUseCase.execute(wing);

      const secondWing = makeWing({ id, model: "LALALA" });
      await expect(createWingUseCase.execute(secondWing)).rejects.toThrowError(
        "Wing Id is already used",
      );
    });
  });
  describe("all is good", () => {
    it("creates a wing", async () => {
      const wing = makeWing();
      await createWingUseCase.execute(wing);
      expect(wingRepo.wings[0].id).toBe(wing.id);
    });
  });
});
