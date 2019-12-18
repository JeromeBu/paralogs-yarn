import { makeWingDTO, uuid } from "@paralogs/shared";
import { InMemoryWingRepo } from "../../infra/repo/inMemory/InMemoryWingRepo";
import { CreateWingUseCase, createWingUseCaseCreator } from "./CreateWingUseCase";

describe("wing creation", () => {
  let createWingUseCase: CreateWingUseCase;
  let wingRepo: InMemoryWingRepo; // cannot use WingRepo because need access .wings
  beforeEach(() => {
    wingRepo = new InMemoryWingRepo();
    createWingUseCase = createWingUseCaseCreator(wingRepo);
  });
  describe("a wing already exists with the same identity", () => {
    it("cannot create a wing with the same id", async () => {
      const id = uuid();
      const wingDto = makeWingDTO({ id });
      await createWingUseCase(wingDto);

      const secondWingDto = makeWingDTO({ id, model: "LALALA" });
      await expect((await createWingUseCase(secondWingDto)).error).toMatch(
        "Wing Id is already used",
      );
    });
  });
  describe("all is good", () => {
    it("creates a wing", async () => {
      const wingDto = makeWingDTO();
      await createWingUseCase(wingDto);
      expect(wingRepo.wings[0].id.value).toBe(wingDto.id);
    });
  });
});
