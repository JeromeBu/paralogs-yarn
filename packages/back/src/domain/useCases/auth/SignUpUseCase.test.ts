import {
  SignUpParams,
  FakeUuidGenerator,
  generateUuid,
  CurrentUserWithAuthToken,
  Result,
} from "@paralogs/shared";
import _ from "lodash";
import { InMemoryUserRepo } from "../../../adapters/secondaries/repositories/inMemory/InMemoryUserRepo";
import { signUpUseCaseCreator, SignUpUseCase } from "./SignUpUseCase";
import { UserEntity } from "../../entities/UserEntity";

import { TestHashAndTokenManager } from "../../../adapters/secondaries/TestHashAndTokenManager";

describe("User signUp", () => {
  let userId = generateUuid();
  const fakeUuidGenerator = new FakeUuidGenerator(userId);
  let hashAndTokenManager: TestHashAndTokenManager;
  let signUpUseCase: SignUpUseCase;
  let userRepo: InMemoryUserRepo;

  beforeEach(() => {
    userId = generateUuid();
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

  describe("email is already taken", () => {
    it("fails to signUp with an explicit message", async () => {
      const signUpParams = buildSignUpParams({
        email: "some@mail.com",
        firstName: "Lulu",
      });
      await signUpUseCase(signUpParams);
      const sameEmailSignUpParams = buildSignUpParams({
        email: "some@mail.com",
        firstName: "lala",
      });
      const emailTakenResult = await signUpUseCase(sameEmailSignUpParams);
      expectResultToBeError(
        emailTakenResult,
        "Email is already taken. Consider logging in.",
      );
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
    it("signs up a user and reformat email and trim names", async () => {
      const signUpParams = buildSignUpParams();
      const someFakeToken = "someFakeToken";
      hashAndTokenManager.setGeneratedToken(someFakeToken);
      const currentUserWithToken = await signUpUseCase(signUpParams);
      expectUserResultToEqual(currentUserWithToken, {
        currentUser: {
          uuid: userId,
          email: "john@mail.com",
        },
        pilotInformation: { firstName: "John", lastName: "Doe" },
        token: someFakeToken,
      });
      const userEntity = userRepo.users[0];
      expect(userEntity.uuid).toEqual(userId);
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

  const expectResultToBeError = (
    result: Result<CurrentUserWithAuthToken>,
    expectedError: string,
  ) => expect(result.error).toBe(expectedError);

  const expectUserResultToEqual = (
    result: Result<CurrentUserWithAuthToken>,
    expectedUserDTO: CurrentUserWithAuthToken,
  ) =>
    result.map(currentUserWithToken =>
      expect(currentUserWithToken).toEqual(expectedUserDTO),
    );

  // const expectUserEmailNotToBeConfirmed = (userEntity: UserEntity) =>
  //   expect(userEntity.getProps().isEmailConfirmed).toBe(false);

  const expectUserHashedPasswordExist = (userEntity: UserEntity) => {
    expect(userEntity.getProps().hashedPassword.length).toBe(60);
  };

  const expectUserToHaveAnAuthToken = (userEntity: UserEntity) => {
    expect(userEntity.getProps().authToken).toBeTruthy();
  };
});
