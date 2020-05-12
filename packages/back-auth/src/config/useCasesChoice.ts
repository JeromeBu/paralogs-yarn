import { ActualUuidGenerator } from "@paralogs/shared";
import { loginCommandHandlerCreator } from "../domain/useCases/auth/LoginCommandHandler";
import { repositories } from "./repositoryChoice";
import { ProductionHashAndTokenManager } from "../adapters/secondaries/ProductionHashAndTokenManager";
import { signUpCommandHandlerCreator } from "../domain/useCases/auth/SignUpCommandHandler";

const userRepo = repositories.user;
const hashAndTokenManager = new ProductionHashAndTokenManager();
const uuidGenerator = new ActualUuidGenerator();

export const authUseCases = {
  login: loginCommandHandlerCreator({
    userRepo,
    hashAndTokenManager,
  }),
  signUp: signUpCommandHandlerCreator({
    userRepo,
    hashAndTokenManager,
    uuidGenerator,
  }),
};
