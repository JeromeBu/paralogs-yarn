import {
  SignUpParams,
  FakeUuidGenerator,
  generateUuid,
  CurrentUserWithPilotAndToken,
} from "@paralogs/shared";
import { Result, expectEitherToMatchError } from "@paralogs/back-shared";
import _ from "lodash";

import { InMemoryUserRepo } from "../../../adapters/secondaries/repositories/inMemory/InMemoryUserRepo";
import {
  signUpCommandHandlerCreator,
  SignUpCommandHandler,
} from "./SignUpCommandHandler";
import { UserEntity } from "../../entities/UserEntity";

import { TestHashAndTokenManager } from "../../../adapters/secondaries/TestHashAndTokenManager";

describe("User signUp", () => {
  let userUuid = generateUuid();
  const fakeUuidGenerator = new FakeUuidGenerator(userUuid);
  let hashAndTokenManager: TestHashAndTokenManager;
  let signUpUseCase: SignUpCommandHandler;
  let userRepo: InMemoryUserRepo;

  beforeEach(() => {
    userUuid = generateUuid();
    fakeUuidGenerator.setUuid(userUuid);
    userRepo = new InMemoryUserRepo();
    hashAndTokenManager = new TestHashAndTokenManager();
    signUpUseCase = signUpCommandHandlerCreator({
      userRepo,
      uuidGenerator: fakeUuidGenerator,
      hashAndTokenManager,
    });
  });

  describe("email is not the write format", () => {
    it("fails to signUp with an explicit message", async () => {
      const signUpParams = buildSignUpParams({ email: "mail.com" });
      const userDtoOrError = await signUpUseCase(signUpParams).run();
      expectEitherToMatchError(userDtoOrError, "Not a valid Email");
    });
  });

  describe("email is already taken", () => {
    it("fails to signUp with an explicit message", async () => {
      const signUpParams = buildSignUpParams({
        email: "some@mail.com",
      });
      await signUpUseCase(signUpParams).run();
      const sameEmailSignUpParams = buildSignUpParams({
        email: "some@mail.com",
      });
      const emailTakenResult = await signUpUseCase(sameEmailSignUpParams).run();
      expectEitherToMatchError(
        emailTakenResult,
        "Email is already taken. Consider logging in.",
      );
    });
  });

  describe("password doesn't match criteria", () => {
    it("fails to signUp with an explicit message", async () => {
      const signUpParamsCases = ["toShort", "nouppercar", "NOLOWERCHAR"].map(password =>
        buildSignUpParams({ password }),
      );
      const [toShortResult, noUpperResult, noLowerResult] = await Promise.all(
        signUpParamsCases.map(params => signUpUseCase(params).run()),
      );
      expectEitherToMatchError(
        toShortResult,
        "Password must be at least 8 characters long",
      );
      expectEitherToMatchError(noUpperResult, "Password must have upper case characters");
      expectEitherToMatchError(noLowerResult, "Password must have lower case characters");
    });
  });

  describe("all is good", () => {
    it("signs up a user and reformat email and trim names", async () => {
      const signUpParams = buildSignUpParams();
      const someFakeToken = "someFakeToken";
      hashAndTokenManager.setGeneratedToken(someFakeToken);
      const currentUserWithToken = await signUpUseCase(signUpParams).run();
      expectUserResultToEqual(currentUserWithToken, {
        currentUser: {
          uuid: userUuid,
          email: "john@mail.com",
        },
        token: someFakeToken,
      });
      const userEntity = userRepo.users[0];
      expect(userEntity.uuid).toEqual(userUuid);
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

  const expectUserResultToEqual = (
    result: Result<CurrentUserWithPilotAndToken>,
    expectedUserDTO: CurrentUserWithPilotAndToken,
  ) => {
    expect(result.isRight()).toBe(true);
    expect(result.extract()).toEqual(expectedUserDTO);
  };

  // const expectUserEmailNotToBeConfirmed = (userEntity: UserEntity) =>
  //   expect(userEntity.getProps().isEmailConfirmed).toBe(false);

  const expectUserHashedPasswordExist = (userEntity: UserEntity) => {
    expect(userEntity.getProps().hashedPassword.length).toBe(60);
  };

  const expectUserToHaveAnAuthToken = (userEntity: UserEntity) => {
    expect(userEntity.getProps().authToken).toBeTruthy();
  };
});
