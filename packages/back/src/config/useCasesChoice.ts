import { ActualUuidGenerator } from "@paralogs/shared";
import { loginUseCaseCreator } from "../domain/useCases/auth/LoginUseCase";
import { repositories } from "../adapters/secondaries/repositories/repositoryChoice";
import { ProductionHashAndTokenManager } from "../adapters/secondaries/ProductionHashAndTokenManager";
import { signUpUseCaseCreator } from "../domain/useCases/auth/SignUpUseCase";
import { addWingUseCaseCreator } from "../domain/useCases/wings/AddWingUseCase";
import { retrieveWingsUseCaseCreator } from "../domain/useCases/wings/RetrieveWingsUseCase";
import { addFlightUseCaseCreator } from "../domain/useCases/flights/AddFlightUseCase";
import { retrieveFlightsUseCaseCreator } from "../domain/useCases/flights/RetreiveFlightsUseCase";

const userRepo = repositories.user;
const hashAndTokenManager = new ProductionHashAndTokenManager();
const uuidGenerator = new ActualUuidGenerator();

export const authUseCases = {
  login: loginUseCaseCreator({
    userRepo,
    hashAndTokenManager,
  }),
  signUp: signUpUseCaseCreator({
    userRepo,
    hashAndTokenManager,
    uuidGenerator,
  }),
};

export const wingsUseCases = {
  addWing: addWingUseCaseCreator({
    wingRepo: repositories.wing,
  }),
  retrieveWings: retrieveWingsUseCaseCreator(repositories.wing),
};

export const flightsUseCases = {
  addFlight: addFlightUseCaseCreator({ flightRepo: repositories.flight }),
  retrieveFlights: retrieveFlightsUseCaseCreator({
    flightRepo: repositories.flight,
  }),
};
