import { WingDTO, makeWingDTO } from "@paralogs/shared";
import { InMemoryWingRepo } from "../../../adapters/secondaries/repo/inMemory/InMemoryWingRepo";
import { createWingUseCaseCreator, CreateWingUseCase } from "./CreateWingUseCase";
import { listWingsUseCaseCreator, ListWingsUseCase } from "./ListWingsUseCase";
import { UserId } from "../../valueObjects/user/UserId";
import { Result } from "../../core/Result";

describe("wings retreival", () => {
  let listWingsUseCase: ListWingsUseCase;
  let wingRepo: InMemoryWingRepo; // cannot use WingRepo because need access .wings

  beforeEach(() => {
    wingRepo = new InMemoryWingRepo();
    listWingsUseCase = listWingsUseCaseCreator(wingRepo);
  });

  describe("user identification is wrong", () => {
    it("warns with an explicit message", async () => {
      const wings = await listWingsUseCase("notAnUUID");
      expectResultErrorToBe(wings, "Given string is not uuid");
    });
  });

  describe("user has no wings", () => {
    it("returns no wing", async () => {
      const wings = await listWingsUseCase(createUserId());
      expectWingsDTOResultToEqual(wings, []);
    });
  });

  describe("user has some wings", () => {
    let createWingUseCase: CreateWingUseCase;
    it("retreives only the user's wings", async () => {
      createWingUseCase = createWingUseCaseCreator(wingRepo);
      const userId = createUserId();

      const wing1 = (await createWing({ model: "Wing 1", userId })).getOrThrow();
      const wing2 = (await createWing({ model: "Wing 2", userId })).getOrThrow();
      await createWing({ model: "Wing 3", userId: createUserId() });

      const retreivedWings = await listWingsUseCase(userId);

      expectWingsDTOResultToEqual(retreivedWings, [wing1, wing2]);
    });

    const createWing = async (wingParams: Partial<WingDTO>) => {
      return createWingUseCase(makeWingDTO(wingParams));
    };
  });

  const expectWingsDTOResultToEqual = (
    wingsDTOResult: Result<WingDTO[]>,
    expectedWingsDTO: WingDTO[],
  ) => {
    wingsDTOResult.map(wingsDTO => expect(wingsDTO).toEqual(expectedWingsDTO));
  };

  const expectResultErrorToBe = (
    wingsDTOResult: Result<WingDTO[]>,
    expectedError: string,
  ) => {
    expect(wingsDTOResult.error).toBe(expectedError);
  };

  const createUserId = (id?: string): string => UserId.create(id).getOrThrow().value;
});
