import { Router } from "express";
import { addFlightSchema, flightsRoute } from "@paralogs/shared";
import { RightAsync } from "@paralogs/back-shared";

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
          eitherAsyncParams: resultAddFlightBody.map(addFlightBody => ({
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
          eitherAsyncParams: RightAsync(req.currentUser),
        }),
      );
    });

  return flightsRouter;
};
