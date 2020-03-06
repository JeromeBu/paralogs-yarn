import { WingDTO, makeWingDTO, uuid } from "@paralogs/shared";
import { InMemoryWingRepo } from "../../../adapters/secondaries/repositories/inMemory/InMemoryWingRepo";
import { addWingUseCaseCreator, AddWingUseCase } from "./AddWingUseCase";
import {
  retreiveWingsUseCaseCreator,
  RetreiveWingsUseCase,
} from "./RetreiveWingsUseCase";
import { UserEntity } from "../../entities/UserEntity";
import {
  setupCurrentUserCreator,
  SetupCurrentUser,
} from "../../testBuilders/userEntityBuilder";
import { InMemoryUserRepo } from "../../../adapters/secondaries/repositories/inMemory/InMemoryUserRepo";
import { TestHashAndTokenManager } from "../../../adapters/secondaries/TestHashAndTokenManager";
import { HashAndTokenManager } from "../../port/HashAndTokenManager";

describe("wings retreival", () => {
  let retreiveWingsUseCase: RetreiveWingsUseCase;
  let wingRepo: InMemoryWingRepo; // cannot use WingRepo because need access .wings
  let userRepo: InMemoryUserRepo; // cannot use UserRepo because need access .users
  let setupCurrentUser: SetupCurrentUser;
  let currentUser: UserEntity;
  let hashAndTokenManager: HashAndTokenManager;

  beforeEach(async () => {
    wingRepo = new InMemoryWingRepo();
    userRepo = new InMemoryUserRepo();
    hashAndTokenManager = new TestHashAndTokenManager();
    setupCurrentUser = setupCurrentUserCreator({ hashAndTokenManager, userRepo });
    currentUser = await setupCurrentUser();
    retreiveWingsUseCase = retreiveWingsUseCaseCreator(wingRepo);
  });

  describe("user has no wings", () => {
    it("returns no wing", async () => {
      const wings = await retreiveWingsUseCase(currentUser);
      expectWingsDTOResultToEqual(wings, []);
    });
  });

  describe("user has some wings", () => {
    let addWingUseCase: AddWingUseCase;
    it("retreives only the user's wings", async () => {
      addWingUseCase = addWingUseCaseCreator({ wingRepo });

      const wing1 = (
        await addWing({ model: "Wing 1", userId: currentUser.id })
      ).getOrThrow();
      const wing2 = (
        await addWing({ model: "Wing 2", userId: currentUser.id })
      ).getOrThrow();
      await addWing({
        model: "Wing 3",
        userId: uuid(),
      });

      const retreivedWings = await retreiveWingsUseCase(currentUser);

      expectWingsDTOResultToEqual(retreivedWings, [wing2, wing1]);
    });

    const addWing = async (wingParams: Partial<WingDTO>) => {
      return addWingUseCase(makeWingDTO(wingParams));
    };
  });

  const expectWingsDTOResultToEqual = (
    wingsDTO: WingDTO[],
    expectedWingsDTO: WingDTO[],
  ) => {
    expect(wingsDTO).toEqual(expectedWingsDTO);
    expect(wingsDTO[0]).toEqual(expectedWingsDTO[0]);
  };
});
