import { WingDTO, makeWingDTO } from "@paralogs/shared";
import { InMemoryWingRepo } from "../../infra/repo/inMemory/InMemoryWingRepo";
import { createWingUseCaseCreator, CreateWingUseCase } from "./CreateWingUseCase";
import { ListWingsUseCase } from "./ListWingsUseCase";
import { UserId } from "../valueObjects/UserId";

describe("wings retreival", () => {
  let listWingsUseCase: ListWingsUseCase;
  let wingRepo: InMemoryWingRepo; // cannot use WingRepo because need access .wings

  beforeEach(() => {
    wingRepo = new InMemoryWingRepo();
    listWingsUseCase = new ListWingsUseCase(wingRepo);
  });

  describe("user has no wings", () => {
    it("returns no wing", async () => {
      const wings = await listWingsUseCase.execute(createUserId());
      expect(wings.getValueOrThrow()).toEqual([]);
    });
  });

  describe("user has some wings", () => {
    let createWingUseCase: CreateWingUseCase;
    it("retreives only the user's wings", async () => {
      createWingUseCase = createWingUseCaseCreator(wingRepo);
      const userId = createUserId();

      const wing1 = (await createWing({ model: "Wing 1", userId })).getValueOrThrow();
      const wing2 = (await createWing({ model: "Wing 2", userId })).getValueOrThrow();
      await createWing({ model: "Wing 3", userId: createUserId() });

      const retreivedWings = await listWingsUseCase.execute(userId);

      expect(retreivedWings.getValueOrThrow()).toEqual([wing1, wing2]);
    });

    const createWing = async (wingParams: Partial<WingDTO>) => {
      return createWingUseCase(makeWingDTO(wingParams));
    };
  });

  const createUserId = (id?: string): string => UserId.create(id).getValueOrThrow().value;
});
