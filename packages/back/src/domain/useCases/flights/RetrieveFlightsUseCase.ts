import { FlightDTO } from "@paralogs/shared";
import { liftPromise } from "purify-ts/EitherAsync";

import { FlightRepo } from "../../gateways/FlightRepo";
import { UserEntity } from "../../entities/UserEntity";
import { flightMapper } from "../../mappers/flight.mapper";
import { ResultAsync } from "../../core/purifyAdds";
import { FlightEntity } from "../../entities/FlightEntity";
import { AppError } from "../../core/errors";

interface RetrieveFlightsDependencies {
  flightRepo: FlightRepo;
}

export const retrieveFlightsUseCaseCreator = ({
  flightRepo,
}: RetrieveFlightsDependencies) => (
  currentUser: UserEntity,
): ResultAsync<FlightDTO[]> => {
  return liftPromise<FlightEntity[], AppError>(() =>
    flightRepo.findByUserUuid(currentUser.uuid),
  ).map(flightEntities => flightEntities.map(flightMapper.entityToDTO));
};

export type RetrieveFlightsUseCase = ReturnType<typeof retrieveFlightsUseCaseCreator>;
