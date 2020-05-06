import { makeWingDTO } from "@paralogs/shared";

import { InMemoryWingRepo } from "../../../adapters/secondaries/repositories/inMemory/InMemoryWingRepo";
import {
  UpdateWingCommandHandler,
  updateWingCommandHandlerCreator,
} from "./UpdateWingCommandHandler";
import { makeWingEntity } from "../../testBuilders/makeWingEntity";
import { wingMapper } from "../../mappers/wing.mapper";
import { expectEitherToMatchError, expectResultOk } from "../../../utils/testHelpers";

describe("update wing use case", () => {
  let updateWingUseCase: UpdateWingCommandHandler;
  let wingRepo: InMemoryWingRepo; // cannot use WingRepo because need access .wings

  beforeEach(() => {
    wingRepo = new InMemoryWingRepo();
    updateWingUseCase = updateWingCommandHandlerCreator({ wingRepo });
  });

  describe("when no wing matches", () => {
    it("fails with explicit message", async () => {
      const response = await updateWingUseCase(makeWingDTO()).run();
      expectEitherToMatchError(response, "No such wing identity found");
    });
  });

  describe("All is good", () => {
    it("updates a wing", async () => {
      // the userUuid here is just a random uuid -> see in makeWingDTO.ts
      const wingDTO = makeWingDTO();
      wingRepo.wings.push(makeWingEntity(wingDTO));
      const { uuid, userUuid } = wingDTO;
      const newParams = {
        uuid,
        userUuid,
        brand: "Nova",
        model: "Ion 5",
        flightTimePriorToOwn: 60,
        ownerFrom: new Date("2020-03-01").toUTCString(),
      };
      const response = await updateWingUseCase(newParams).run();
      expectResultOk(response);

      const expectedWingDTO = makeWingDTO(newParams);
      const updatedWing = wingMapper.entityToDTO(wingRepo.wings[0]);
      expect(updatedWing).toEqual(expectedWingDTO);
    });
  });
});
