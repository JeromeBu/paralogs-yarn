import { FlightDTO, Result } from "@paralogs/shared";
import { FlightRepo } from "../../gateways/FlightRepo";
import { FlightEntity } from "../../entities/FlightEntity";

interface AddFlightDependencies {
  flightRepo: FlightRepo;
}

export const addFlightCommandHandlerCreator = ({
  flightRepo,
}: AddFlightDependencies) => async (flightDto: FlightDTO): Promise<Result<void>> => {
  const existingFlightEntity = await flightRepo.findByUuid(flightDto.uuid);
  if (existingFlightEntity) return Result.fail("A flight with this id already exists");
  return FlightEntity.create(flightDto).flatMapAsync(flightEntity => {
    return flightRepo.save(flightEntity);
  });
};

export type AddFlightCommandHandler = ReturnType<typeof addFlightCommandHandlerCreator>;
