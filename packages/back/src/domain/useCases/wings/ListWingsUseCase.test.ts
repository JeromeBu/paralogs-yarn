import { WingDTO, makeWingDTO, uuid } from "@paralogs/shared";
import { InMemoryWingRepo } from "../../../adapters/secondaries/repositories/inMemory/InMemoryWingRepo";
import { createWingUseCaseCreator, CreateWingUseCase } from "./CreateWingUseCase";
import { listWingsUseCaseCreator, ListWingsUseCase } from "./ListWingsUseCase";
import { UserEntity } from "../../entities/UserEntity";
import { setupCurrentUserCreator } from "../../testBuilders/userEntityBuilder";
import { InMemoryUserRepo } from "../../../adapters/secondaries/repositories/inMemory/InMemoryUserRepo";
import { TestHashAndTokenManager } from "../../../adapters/secondaries/TestHashAndTokenManager";
import { HashAndTokenManager } from "../../port/HashAndTokenManager";

describe("wings retreival", () => {
  let listWingsUseCase: ListWingsUseCase;
  let wingRepo: InMemoryWingRepo; // cannot use WingRepo because need access .wings
  let userRepo: InMemoryUserRepo; // cannot use UserRepo because need access .users
  let setupCurrentUser: ReturnType<typeof setupCurrentUserCreator>;
  let currentUser: UserEntity;
  let hashAndTokenManager: HashAndTokenManager;

  beforeEach(async () => {
    wingRepo = new InMemoryWingRepo();
    userRepo = new InMemoryUserRepo();
    hashAndTokenManager = new TestHashAndTokenManager();
    setupCurrentUser = setupCurrentUserCreator({ hashAndTokenManager, userRepo });
    currentUser = await setupCurrentUser();
    listWingsUseCase = listWingsUseCaseCreator(wingRepo);
  });

  describe("user has no wings", () => {
    it("returns no wing", async () => {
      const wings = await listWingsUseCase(currentUser);
      expectWingsDTOResultToEqual(wings, []);
    });
  });

  describe("user has some wings", () => {
    let createWingUseCase: CreateWingUseCase;
    it("retreives only the user's wings", async () => {
      createWingUseCase = createWingUseCaseCreator(wingRepo);

      const wing1 = (
        await createWing({ model: "Wing 1", userId: currentUser.id })
      ).getOrThrow();
      const wing2 = (
        await createWing({ model: "Wing 2", userId: currentUser.id })
      ).getOrThrow();
      await createWing({
        model: "Wing 3",
        userId: uuid(),
      });

      const retreivedWings = await listWingsUseCase(currentUser);

      expectWingsDTOResultToEqual(retreivedWings, [wing1, wing2]);
    });

    const createWing = async (wingParams: Partial<WingDTO>) => {
      return createWingUseCase(makeWingDTO(wingParams));
    };
  });

  const expectWingsDTOResultToEqual = (
    wingsDTO: WingDTO[],
    expectedWingsDTO: WingDTO[],
  ) => {
    expect(wingsDTO).toEqual(expectedWingsDTO);
  };
});
