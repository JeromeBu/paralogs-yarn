import { pilotSchema, usersRoute } from "@paralogs/shared";
import { Router } from "express";

import { pilotsUseCases } from "../../../config/useCasesChoice";
import {
  callUseCase,
  sendHttpResponse,
  validateSchema,
} from "../../lib/response-lib";

const pilotsRouter = Router();

export const pilotsController = (): Router => {
  // pilotsRouter.route(usersRoute).post(async (req, res) => {
  //   const resultBody = await validateSchema(pilotSchema, req.body);
  //   return sendHttpResponse(
  //     res,
  //     await callUseCase({
  //       useCase: await pilotsUseCases.create,
  //       eitherAsyncParams: resultBody.map(body => ({
  //         ...body,
  //         pilotUuid: req.currentUserUuid,
  //       })),
  //     }),
  //   );
  // });
  pilotsRouter.route(usersRoute).put(async (req, res) => {
    const resultBody = await validateSchema(pilotSchema, req.body);
    return sendHttpResponse(
      res,
      await callUseCase({
        useCase: await pilotsUseCases.update,
        eitherAsyncParams: resultBody.map((body) => ({
          ...body,
          pilotUuid: req.currentUserUuid,
        })),
      }),
    );
  });

  return pilotsRouter;
};
