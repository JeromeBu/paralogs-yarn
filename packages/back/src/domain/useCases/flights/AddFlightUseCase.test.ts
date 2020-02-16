import { FlightId, uuid, makeFlightDTO, FlightDTO } from "@paralogs/shared";
import { AddFlightUseCase, addFlightUseCaseCreator } from "./AddFlightUseCase";
import { InMemoryFlightRepo } from "../../../adapters/secondaries/repositories/inMemory/InMemoryFlightRepo";
import { Result } from "../../core/Result";

describe("add a flight", () => {
  let addFlightUseCase: AddFlightUseCase;
  let flightRepo: InMemoryFlightRepo;

  beforeEach(() => {
    flightRepo = new InMemoryFlightRepo();
    addFlightUseCase = addFlightUseCaseCreator({ flightRepo });
  });

  describe("a flight already exists with the same identity", () => {
    it("cannot create a flight", async () => {
      const id: FlightId = uuid();
      const flightDto = makeFlightDTO({ id });
      await addFlightUseCase(flightDto);

      const flightDtoWithSameId = makeFlightDTO({ id, site: "The new one" });
      const result = await addFlightUseCase(flightDtoWithSameId);

      expect(result.error).toBe("A flight with this id already exists");
    });
  });

  describe("all is good", () => {
    it("creates a flight", async () => {
      const id: FlightId = uuid();
      const flightDto = makeFlightDTO({ id });
      const createdFlight = await addFlightUseCase(flightDto);
      expectFlightDtoResultToEqual(createdFlight, flightDto);
      await expectRepoToHaveFlight(id);
    });
  });

  const expectFlightDtoResultToEqual = (
    result: Result<FlightDTO>,
    expected: FlightDTO,
  ) => {
    result
      .map(createdFlightDTO => expect(createdFlightDTO).toEqual(expected))
      .getOrThrow();
  };

  const expectRepoToHaveFlight = async (flightId: FlightId) => {
    expect(await flightRepo.findById(flightId)).toBeDefined();
  };
});
