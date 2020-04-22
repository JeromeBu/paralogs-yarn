import { FlightDTO, Result } from "@paralogs/shared";
import { FlightRepo } from "../../gateways/FlightRepo";
import { FlightEntity } from "../../entities/FlightEntity";
import { flightMapper } from "../../mappers/flight.mapper";

interface AddFlightDependencies {
  flightRepo: FlightRepo;
}

export const addFlightUseCaseCreator = ({ flightRepo }: AddFlightDependencies) => async (
  flightDto: FlightDTO,
): Promise<Result<FlightDTO>> => {
  const existingFlightEntity = await flightRepo.findById(flightDto.id);
  if (existingFlightEntity) return Result.fail("A flight with this id already exists");
  return FlightEntity.create(flightDto).mapAsync(async flightEntity => {
    await flightRepo.create(flightEntity);
    return flightMapper.entityToDTO(flightEntity);
  });
};

export type AddFlightUseCase = ReturnType<typeof addFlightUseCaseCreator>;
