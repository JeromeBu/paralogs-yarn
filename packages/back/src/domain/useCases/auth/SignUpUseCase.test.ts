import { SignUpParams, FakeUuidGenerator } from "@paralogs/shared";
import _ from "lodash";
import { InMemoryUserRepo } from "../../../infra/repo/inMemory/InMemoryUserRepo";
import { signUpUseCaseCreator, SignUpUseCase } from "./SignUpUseCase";

describe("User signUp", () => {
  const userId = "someFakeId";
  const fakeUuidGenerator = new FakeUuidGenerator(userId);
  let signUpUseCase: SignUpUseCase;
  let userRepo: InMemoryUserRepo;
  beforeEach(() => {
    userRepo = new InMemoryUserRepo();
    signUpUseCase = signUpUseCaseCreator(userRepo, fakeUuidGenerator);
  });

  describe("email is not the write format", () => {
    it("fails to signUp with an explicit message", async () => {
      const signUpParams = buildSignUpParams({ email: "mail.com" });
      const userDtoOrErro = await signUpUseCase(signUpParams);
      expect(userDtoOrErro.error).toBe("Not a valid Email");
    });
  });

  describe("password doesn't match critierias", () => {
    it("fails to signUp with an explicit message", async () => {
      const signUpParamsCases = ["toShort", "nouppercar", "NOLOWERCHAR"].map(password =>
        buildSignUpParams({ password }),
      );
      const [toShortResult, noUpperResult, noLowerResult] = await Promise.all(
        signUpParamsCases.map(signUpUseCase),
      );
      expect(toShortResult.error).toBe("Password must be at least 8 characters long");
      expect(noUpperResult.error).toBe("Password must have upper case characters");
      expect(noLowerResult.error).toBe("Password must have lower case characters");
    });
  });

  describe("all is good", () => {
    it("signs up a user and reformats names and email", async () => {
      const signUpParams = buildSignUpParams();
      const userDto = await signUpUseCase(signUpParams);
      expect(userDto.getValueOrThrow()).toEqual({
        id: userId,
        email: "john@mail.com",
        firstName: "John",
        lastName: "Doe",
      });
      expect(userRepo.users[0].id.value).toEqual(userId);
    });
  });

  const buildSignUpParams = (params?: Partial<SignUpParams>): SignUpParams => {
    const randomSignUpParams = {
      email: "joHn@mail.com",
      password: "Secret123",
      firstName: " john",
      lastName: "doe ",
    };
    return _.merge({}, randomSignUpParams, params);
  };
});
