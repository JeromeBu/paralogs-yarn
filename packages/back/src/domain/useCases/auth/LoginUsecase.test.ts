import { CurrentUserWithAuthToken } from "@paralogs/shared";
import { loginUseCaseCreator, LoginUseCase } from "./LoginUseCase";
import { InMemoryUserRepo } from "../../../adapters/secondaries/repo/inMemory/InMemoryUserRepo";
import { TestHashAndTokenManager } from "../../../adapters/secondaries/TestHashAndTokenManager";
import { makeUserEntityCreator } from "../../testBuilders/userEntityBuilder";
import { Result } from "../../core/Result";

describe("User Login", () => {
  let hashAndTokenManager: TestHashAndTokenManager;
  let loginUseCase: LoginUseCase;
  let userRepo: InMemoryUserRepo;
  let makeUserEntity: ReturnType<typeof makeUserEntityCreator>;

  beforeEach(() => {
    hashAndTokenManager = new TestHashAndTokenManager();
    userRepo = new InMemoryUserRepo();
    loginUseCase = loginUseCaseCreator({ userRepo, hashAndTokenManager });
    makeUserEntity = makeUserEntityCreator(hashAndTokenManager);
  });

  describe("Email is not valid", () => {
    it("warns that email is not valid", async () => {
      const response = await loginUseCase({
        email: "not an email",
        password: "whatever",
      });
      expectErrorToBe(response, "Not a valid Email");
    });
  });

  describe("Email does not match any user", () => {
    it("warns no user found", async () => {
      const response = await loginUseCase({
        email: "notFound@mail.com",
        password: "whatever",
      });
      expectErrorToBe(response, "No user found");
    });
  });

  describe("Password is wrong", () => {
    it("warns password is wrong", async () => {
      const email = "john.Doe@mail.com";
      userRepo.setUsers([await makeUserEntity({ email })]);
      const response = await loginUseCase({
        email,
        password: "wrongPassword",
      });
      expectErrorToBe(response, "Wrong password");
    });
  });

  describe("Email and Password are good", () => {
    it("sends current user and authentication token", async () => {
      const email = "john.doe@mail.com";
      const firstName = "John";
      const lastName = "Doe";
      const password = "Secret123";
      const jwtToken = "someFakeToken";
      hashAndTokenManager.setGeneratedToken(jwtToken);
      const userEntity = await makeUserEntity({ email, password, firstName, lastName });
      userRepo.setUsers([userEntity]);
      const response = await loginUseCase({
        email,
        password,
      });

      expectUserResultToEqual(response, {
        token: jwtToken,
        currentUser: {
          id: userEntity.id.value,
          email,
          firstName,
          lastName,
        },
      });
    });
  });

  const expectUserResultToEqual = (
    result: Result<CurrentUserWithAuthToken>,
    expectedUserDTOWithToken: CurrentUserWithAuthToken,
  ) => result.map(userDTO => expect(userDTO).toEqual(expectedUserDTOWithToken));

  const expectErrorToBe = (result: Result<unknown>, expectedError: string) => {
    expect(result.error).toBe(expectedError);
  };
});
