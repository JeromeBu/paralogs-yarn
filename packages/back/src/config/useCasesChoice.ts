import { ActualUuidGenerator } from "@paralogs/shared";
import { loginUseCaseCreator } from "../domain/useCases/auth/LoginUseCase";
import { repositories } from "../adapters/secondaries/repositories/repositoryChoice";
import { ProductionHashAndTokenManager } from "../adapters/secondaries/ProductionHashAndTokenManager";
import { signUpUseCaseCreator } from "../domain/useCases/auth/SignUpUseCase";

const userRepo = repositories.user;
const hashAndTokenManager = new ProductionHashAndTokenManager();
const uuidGenerator = new ActualUuidGenerator();

const login = loginUseCaseCreator({
  userRepo,
  hashAndTokenManager,
});

const signUp = signUpUseCaseCreator({
  userRepo,
  hashAndTokenManager,
  uuidGenerator,
});

export const authUseCases = {
  login,
  signUp,
};
