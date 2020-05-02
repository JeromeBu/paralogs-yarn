import { FlightUuid, generateUuid, makeFlightDTO, FlightDTO } from "@paralogs/shared";
import { AddFlightUseCase, addFlightUseCaseCreator } from "./AddFlightUseCase";
import { InMemoryFlightRepo } from "../../../adapters/secondaries/repositories/inMemory/InMemoryFlightRepo";
import { flightMapper } from "../../mappers/flight.mapper";

describe("add a flight", () => {
  let addFlightUseCase: AddFlightUseCase;
  let flightRepo: InMemoryFlightRepo;

  beforeEach(() => {
    flightRepo = new InMemoryFlightRepo();
    addFlightUseCase = addFlightUseCaseCreator({ flightRepo });
  });

  describe("a flight already exists with the same identity", () => {
    it("cannot create a flight", async () => {
      const id: FlightUuid = generateUuid();
      const flightDto = makeFlightDTO({ uuid: id });
      await addFlightUseCase(flightDto);

      const flightDtoWithSameId = makeFlightDTO({ uuid: id, site: "The new one" });
      const result = await addFlightUseCase(flightDtoWithSameId);

      expect(result.error).toBe("A flight with this id already exists");
    });
  });

  describe("all is good", () => {
    it("creates a flight", async () => {
      const uuid: FlightUuid = generateUuid();
      const flightDto = makeFlightDTO({ uuid });
      await addFlightUseCase(flightDto);
      expectFlightDtoToBeSaved(flightDto);
    });
  });

  const expectFlightDtoToBeSaved = (flightDTO: FlightDTO) => {
    const flightFound = flightRepo.flights.find(({ uuid }) => uuid === flightDTO.uuid)!;
    expect(flightMapper.entityToDTO(flightFound)).toEqual(flightDTO);
  };
});
