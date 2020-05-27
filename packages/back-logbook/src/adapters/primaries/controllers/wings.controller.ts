import {
  callUseCase,
  RightAsync,
  sendHttpResponse,
  validateSchema,
} from "@paralogs/back-shared";
import { addWingSchema, updateWingSchema, wingsRoute } from "@paralogs/shared";
import { Router } from "express";

import { getWingsUseCases } from "../../../config/useCasesChoice";

const wingsRouter = Router();

export const wingsController = async () => {
  const wingsUseCases = await getWingsUseCases();

  wingsRouter
    .route(wingsRoute)
    .get(async (req, res) =>
      sendHttpResponse(
        res,
        await callUseCase({
          useCase: wingsUseCases.retrieveWings,
          eitherAsyncParams: RightAsync(req.currentUserUuid),
        }),
      ),
    )
    .post(async (req, res) => {
      const eitherAsyncParams = validateSchema(addWingSchema, req.body);
      return sendHttpResponse(
        res,
        await callUseCase({
          useCase: wingsUseCases.addWing,
          eitherAsyncParams: eitherAsyncParams.map((addWingBody) => ({
            ...addWingBody,
            pilotUuid: req.currentUserUuid,
          })),
        }),
      );
    })
    .put(async (req, res) => {
      const resultUpdateWingBody = await validateSchema(
        updateWingSchema,
        req.body,
      );
      return sendHttpResponse(
        res,
        await callUseCase({
          useCase: wingsUseCases.updateWing,
          eitherAsyncParams: resultUpdateWingBody.map((updateWingBody) => ({
            ...updateWingBody,
            pilotUuid: req.currentUserUuid,
          })),
        }),
      );
    });

  return wingsRouter;
};
