import { makeWingDTO, uuid, WingDTO } from "@paralogs/shared";
import { InMemoryWingRepo } from "../../../adapters/secondaries/repositories/inMemory/InMemoryWingRepo";
import { AddWingUseCase, addWingUseCaseCreator } from "./AddWingUseCase";
import { Result } from "../../core/Result";

describe("wing creation", () => {
  let addWingUseCase: AddWingUseCase;
  let wingRepo: InMemoryWingRepo; // cannot use WingRepo because need access .wings
  beforeEach(() => {
    wingRepo = new InMemoryWingRepo();
    addWingUseCase = addWingUseCaseCreator(wingRepo);
  });
  describe("a wing already exists with the same identity", () => {
    it("cannot create a wing with the same id", async () => {
      const id = uuid();
      const userId = uuid();
      const wingDto = makeWingDTO({ id });
      await addWingUseCase(wingDto);

      const secondWingDto = makeWingDTO({ id, userId, model: "LALALA" });
      await expect((await addWingUseCase(secondWingDto)).error).toMatch(
        "Wing Id is already used",
      );
    });
  });
  describe("all is good", () => {
    it("creates a wing", async () => {
      const wingDto = makeWingDTO();
      const createdWing = await addWingUseCase(wingDto);
      expect(wingRepo.wings[0].id).toBe(wingDto.id);
      expectWingDtoResultToEqual(createdWing, wingDto);
    });
  });

  const expectWingDtoResultToEqual = (result: Result<WingDTO>, expected: WingDTO) => {
    result.map(createdWingDTO => expect(createdWingDTO).toEqual(expected)).getOrThrow();
  };
});
