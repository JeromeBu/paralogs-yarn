import { AppError, ResultAsync } from "@paralogs/back-shared";
import { FlightDTO, PilotUuid } from "@paralogs/shared";
import { liftPromise } from "purify-ts/EitherAsync";

import { FlightEntity } from "../../writes/entities/FlightEntity";
import { FlightRepo } from "../../writes/gateways/FlightRepo";
import { flightMapper } from "../../writes/mappers/flight.mapper";

interface RetrieveFlightsDependencies {
  flightRepo: FlightRepo;
}

export const retrieveFlightsUseCaseCreator = ({
  flightRepo,
}: RetrieveFlightsDependencies) => (
  currentUserUuid: PilotUuid,
): ResultAsync<FlightDTO[]> => {
  return liftPromise<FlightEntity[], AppError>(() =>
    flightRepo.findByPilotUuid(currentUserUuid),
  ).map((flightEntities) => flightEntities.map(flightMapper.entityToDTO));
};

export type RetrieveFlightsUseCase = ReturnType<
  typeof retrieveFlightsUseCaseCreator
>;
