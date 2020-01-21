import { makeWingDTO, uuid, WingDTO } from "@paralogs/shared";
import { InMemoryWingRepo } from "../../../adapters/secondaries/repo/inMemory/InMemoryWingRepo";
import { CreateWingUseCase, createWingUseCaseCreator } from "./CreateWingUseCase";
import { Result } from "../../core/Result";

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
      const userId = uuid();
      const wingDto = makeWingDTO({ id });
      await createWingUseCase(wingDto);

      const secondWingDto = makeWingDTO({ id, userId, model: "LALALA" });
      await expect((await createWingUseCase(secondWingDto)).error).toMatch(
        "Wing Id is already used",
      );
    });
  });
  describe("all is good", () => {
    it("creates a wing", async () => {
      const wingDto = makeWingDTO();
      const createdWing = await createWingUseCase(wingDto);
      expect(wingRepo.wings[0].id.value).toBe(wingDto.id);
      expectWingDtoResultToEqual(createdWing, wingDto);
    });
  });

  const expectWingDtoResultToEqual = (result: Result<WingDTO>, expected: WingDTO) => {
    result.map(createdWingDTO => expect(createdWingDTO).toEqual(expected));
  };
});
