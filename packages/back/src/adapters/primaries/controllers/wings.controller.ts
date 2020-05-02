import { Router } from "express";
import { addWingSchema, Result, updateWingSchema, wingsRoute } from "@paralogs/shared";
import { callUseCase, sendHttpResponse, validateSchema } from "../../lib/response-lib";
import { wingsUseCases } from "../../../config/useCasesChoice";

const wingsRouter = Router();

export const wingsController = () => {
  wingsRouter
    .route(wingsRoute)
    .get(async (req, res) =>
      sendHttpResponse(
        res,
        await callUseCase({
          useCase: wingsUseCases.retrieveWings,
          resultParams: Result.ok(req.currentUser),
        }),
      ),
    )
    .post(async (req, res) => {
      const resultAddWingBody = await validateSchema(addWingSchema, req.body);
      return sendHttpResponse(
        res,
        await callUseCase({
          useCase: wingsUseCases.addWing,
          resultParams: resultAddWingBody.map(addWingBody => ({
            ...addWingBody,
            userUuid: req.currentUser.uuid,
          })),
        }),
      );
    })
    .put(async (req, res) => {
      const resultUpdateWingBody = await validateSchema(updateWingSchema, req.body);
      return sendHttpResponse(
        res,
        await callUseCase({
          useCase: wingsUseCases.updateWing,
          resultParams: resultUpdateWingBody.map(updateWingBody => ({
            uuid: updateWingBody.uuid,
            ...updateWingBody,
            userUuid: req.currentUser.uuid,
          })),
        }),
      );
    });

  return wingsRouter;
};
