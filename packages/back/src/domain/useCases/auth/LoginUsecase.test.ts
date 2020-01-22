import { loginUseCaseCreator, LoginUseCase } from "./LoginUseCase";
import { InMemoryUserRepo } from "../../../adapters/secondaries/repo/inMemory/InMemoryUserRepo";
import { Result } from "../../core/Result";
import { HashAndTokenManager } from "../../port/HashAndTokenManager";
import { TestHashAndTokenManager } from "../../../adapters/secondaries/TestHashAndTokenManager";
import { makeUserEntityCreator } from "../../testBuilders/userEntityBuilder";

describe("User Login", () => {
  let hashAndTokenManager: HashAndTokenManager;
  let loginUseCase: LoginUseCase;
  let userRepo: InMemoryUserRepo;
  let makeUserEntity: ReturnType<typeof makeUserEntityCreator>;

  beforeEach(() => {
    hashAndTokenManager = new TestHashAndTokenManager();
    userRepo = new InMemoryUserRepo();
    loginUseCase = loginUseCaseCreator({ userRepo });
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
    it("warns no user found", async () => {
      const email = "john.Doe@mail.com";
      userRepo.users = [await makeUserEntity({ email })];
      const response = await loginUseCase({
        email,
        password: "wrongPassword",
      });
      expectErrorToBe(response, "Wrong password");
    });
  });

  const expectErrorToBe = (result: Result<unknown>, expectedError: string) => {
    expect(result.error).toBe(expectedError);
  };
});
