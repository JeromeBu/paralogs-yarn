import { Router } from "express";
import { addFlightSchema, flightsRoute, Result } from "@paralogs/shared";
import { callUseCase, sendHttpResponse, validateSchema } from "../../lib/response-lib";
import { flightsUseCases } from "../../../config/useCasesChoice";

export const flightsRouter = Router();

export const flightsController = () => {
  flightsRouter
    .route(flightsRoute)
    .post(async (req, res) => {
      const resultAddFlightBody = await validateSchema(addFlightSchema, req.body);
      return sendHttpResponse(
        res,
        await callUseCase({
          useCase: flightsUseCases.addFlight,
          resultParams: resultAddFlightBody.map(addFlightBody => ({
            ...addFlightBody,
            userUuid: req.currentUser.uuid,
          })),
        }),
      );
    })
    .get(async (req, res) => {
      return sendHttpResponse(
        res,
        await callUseCase({
          useCase: flightsUseCases.retrieveFlights,
          resultParams: Result.ok(req.currentUser),
        }),
      );
    });

  return flightsRouter;
};
