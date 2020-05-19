import { CurrentUserWithAuthToken, generateUuid } from "@paralogs/shared";

import { InMemoryUserRepo } from "../../../adapters/secondaries/repositories/inMemory/InMemoryUserRepo";
import { TestHashAndTokenManager } from "../../../adapters/secondaries/TestHashAndTokenManager";
import { UserEntity } from "../../entities/UserEntity";
import { getCurrentUserUseCaseCreator } from "./GetCurrentUser";

describe("Get Me, recovers logged user information", () => {
  it("get's users information", async () => {
    const userRepo = new InMemoryUserRepo();
    const userProps = {
      uuid: generateUuid(),
      email: "john@mail.com",
      firstName: "John",
      lastName: "Doe",
    };
    const userEntity = (
      await UserEntity.create(
        {
          password: "Bépo1234",
          ...userProps,
        },
        { hashAndTokenManager: new TestHashAndTokenManager() },
      ).run()
    ).extract() as UserEntity;
    userRepo.setUsers([userEntity]);
    const getCurrentUserUseCase = getCurrentUserUseCaseCreator({ userRepo });
    const userDtoWithToken = (
      await getCurrentUserUseCase({ userUuid: userEntity.uuid }).run()
    ).extract() as CurrentUserWithAuthToken;
    expect(userDtoWithToken.currentUser).toMatchObject({
      ...userProps,
    });
    expect(userDtoWithToken.token).toBeTruthy();
  });
});
