import { Router } from "express";
import { addWingSchema, Result, wingsRoute } from "@paralogs/shared";
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
            userId: req.currentUser.id,
          })),
        }),
      );
    });

  return wingsRouter;
};
