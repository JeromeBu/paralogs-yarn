import { WingDTO, makeWingDTO } from "@paralogs/shared";
import { InMemoryWingRepo } from "../../../infra/repo/inMemory/InMemoryWingRepo";
import { createWingUseCaseCreator, CreateWingUseCase } from "./CreateWingUseCase";
import { listWingsUseCaseCreator, ListWingsUseCase } from "./ListWingsUseCase";
import { UserId } from "../../valueObjects/user/UserId";

describe("wings retreival", () => {
  let listWingsUseCase: ListWingsUseCase;
  let wingRepo: InMemoryWingRepo; // cannot use WingRepo because need access .wings

  beforeEach(() => {
    wingRepo = new InMemoryWingRepo();
    listWingsUseCase = listWingsUseCaseCreator(wingRepo);
  });

  describe("user has no wings", () => {
    it("returns no wing", async () => {
      const wings = await listWingsUseCase(createUserId());
      expect(wings.getOrThrow()).toEqual([]);
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

      expect(retreivedWings.getOrThrow()).toEqual([wing1, wing2]);
    });

    const createWing = async (wingParams: Partial<WingDTO>) => {
      return createWingUseCase(makeWingDTO(wingParams));
    };
  });

  const createUserId = (id?: string): string => UserId.create(id).getOrThrow().value;
});
