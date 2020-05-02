import { makeWingDTO, generateUuid, WingDTO, Result } from "@paralogs/shared";
import { InMemoryWingRepo } from "../../../adapters/secondaries/repositories/inMemory/InMemoryWingRepo";
import { AddWingUseCase, addWingUseCaseCreator } from "./AddWingUseCase";

describe("wing creation", () => {
  let addWingUseCase: AddWingUseCase;
  let wingRepo: InMemoryWingRepo; // cannot use WingRepo because need access .wings
  beforeEach(() => {
    wingRepo = new InMemoryWingRepo();
    addWingUseCase = addWingUseCaseCreator({ wingRepo });
  });
  describe("a wing already exists with the same identity", () => {
    it("cannot create a wing with the same id", async () => {
      const uuid = generateUuid();
      const userUuid = generateUuid();
      const wingDto = makeWingDTO({ uuid });
      await addWingUseCase(wingDto);

      const secondWingDto = makeWingDTO({ uuid, userUuid, model: "LALALA" });
      expect((await addWingUseCase(secondWingDto)).error).toMatch(
        "Wing Id is already used",
      );
    });
  });
  describe("all is good", () => {
    it("creates a wing", async () => {
      const wingDto = makeWingDTO();
      const createdWing = await addWingUseCase(wingDto);
      expect(wingRepo.wings[0].uuid).toBe(wingDto.uuid);
      expectWingDtoResultToEqual(createdWing, wingDto);
    });
  });

  const expectWingDtoResultToEqual = (result: Result<WingDTO>, expected: WingDTO) => {
    result.map(createdWingDTO => expect(createdWingDTO).toEqual(expected)).getOrThrow();
  };
});
