import { generateUuid } from "@paralogs/shared";

import { InMemoryUserRepo } from "../../../adapters/secondaries/repositories/inMemory/InMemoryUserRepo";
import { TestHashAndTokenManager } from "../../../adapters/secondaries/TestHashAndTokenManager";
import { UserEntity } from "../../entities/UserEntity";
import { getMeUseCaseCreator } from "./GetMeUseCase";

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
    const getMeUseCase = getMeUseCaseCreator({ userRepo });
    const userDto = (await getMeUseCase({ userUuid: userEntity.uuid }).run()).extract();
    expect(userDto).toMatchObject(userProps);
  });
});
