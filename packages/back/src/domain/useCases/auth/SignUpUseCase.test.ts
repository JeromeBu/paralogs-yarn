import { SignUpParams, FakeUuidGenerator, UserDTO, uuid } from "@paralogs/shared";
import _ from "lodash";
import { InMemoryUserRepo } from "../../../adapters/secondaries/repo/inMemory/InMemoryUserRepo";
import { signUpUseCaseCreator, SignUpUseCase } from "./SignUpUseCase";
import { UserEntity } from "../../entities/UserEntity";
import { Result } from "../../core/Result";
import { TestHashAndTokenManager } from "../../../adapters/secondaries/TestHashAndTokenManager";
import { HashAndTokenManager } from "../../port/HashAndTokenManager";

describe("User signUp", () => {
  let userId = uuid();
  const fakeUuidGenerator = new FakeUuidGenerator(userId);
  let hashAndTokenManager: HashAndTokenManager;
  let signUpUseCase: SignUpUseCase;
  let userRepo: InMemoryUserRepo;

  beforeEach(() => {
    userId = uuid();
    fakeUuidGenerator.setUuid(userId);
    userRepo = new InMemoryUserRepo();
    hashAndTokenManager = new TestHashAndTokenManager();
    signUpUseCase = signUpUseCaseCreator({
      userRepo,
      uuidGenerator: fakeUuidGenerator,
      hashAndTokenManager,
    });
  });

  describe("email is not the write format", () => {
    it("fails to signUp with an explicit message", async () => {
      const signUpParams = buildSignUpParams({ email: "mail.com" });
      const userDtoOrError = await signUpUseCase(signUpParams);
      expectResultToBeError(userDtoOrError, "Not a valid Email");
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
      expectResultToBeError(toShortResult, "Password must be at least 8 characters long");
      expectResultToBeError(noUpperResult, "Password must have upper case characters");
      expectResultToBeError(noLowerResult, "Password must have lower case characters");
    });
  });

  describe("all is good", () => {
    it("signs up a user and reformats names and email", async () => {
      const signUpParams = buildSignUpParams();
      const userDto = await signUpUseCase(signUpParams);
      expectUserResultToEqual(userDto, {
        id: userId,
        email: "john@mail.com",
        firstName: "John",
        lastName: "Doe",
      });
      const userEntity = userRepo.users[0];
      expect(userEntity.id.value).toEqual(userId);
      // expectUserEmailNotToBeConfirmed(userEntity);
      // How to improve hashing process testing ?
      expectUserHashedPasswordExist(userEntity);
      expectUserToHaveAnAuthToken(userEntity);
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

  const expectResultToBeError = (result: Result<UserDTO>, expectedError: string) =>
    expect(result.error).toBe(expectedError);

  const expectUserResultToEqual = (result: Result<UserDTO>, expectedUserDTO: UserDTO) =>
    result.map(userDTO => expect(userDTO).toEqual(expectedUserDTO));

  // const expectUserEmailNotToBeConfirmed = (userEntity: UserEntity) =>
  //   expect(userEntity.getProps().isEmailConfirmed).toBe(false);

  const expectUserHashedPasswordExist = (userEntity: UserEntity) => {
    expect(userEntity.getProps().hashedPassword.length).toBe(60);
  };

  const expectUserToHaveAnAuthToken = (userEntity: UserEntity) => {
    expect(userEntity.getProps().authToken).toBeTruthy();
  };
});
