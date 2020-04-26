import { makeWingDTO } from "@paralogs/shared";
import { InMemoryWingRepo } from "../../../adapters/secondaries/repositories/inMemory/InMemoryWingRepo";
import { UpdateWingUseCase, updateWingUseCaseCreator } from "./UpdateWingUseCase";
import { makeWingEntity } from "../../testBuilders/makeWingEntity";
import { wingMapper } from "../../mappers/wing.mapper";

describe("update wing use case", () => {
  let updateWingUseCase: UpdateWingUseCase;
  let wingRepo: InMemoryWingRepo; // cannot use WingRepo because need access .wings

  beforeEach(() => {
    wingRepo = new InMemoryWingRepo();
    updateWingUseCase = updateWingUseCaseCreator({ wingRepo });
  });

  describe("when no wing matches", () => {
    it("fails with explicit message", async () => {
      const response = await updateWingUseCase(makeWingDTO());
      expect(response.error).toBe("No such wing identity found");
    });
  });

  describe("All is good", () => {
    it("updates a wing", async () => {
      // the userId here is just a uuid -> see in makeWingDTO.ts
      const wingDTO = makeWingDTO();
      wingRepo.wings.push(makeWingEntity(wingDTO));
      const { id, userId } = wingDTO;
      const newParams = {
        id,
        userId,
        brand: "Nova",
        model: "Ion 5",
        flightTimePriorToOwn: 60,
        ownerFrom: new Date("2020-03-01").toUTCString(),
      };
      const response = await updateWingUseCase(newParams);

      expect(response.error).toBeUndefined();
      expect(response.isSuccess).toBe(true);

      const expectedWingDTO = makeWingDTO(newParams);
      const updatedWing = wingMapper.entityToDTO(wingRepo.wings[0]);
      expect(updatedWing).toEqual(expectedWingDTO);
    });
  });
});
