import { Router } from "express";
import { pilotSchema, usersRoute } from "@paralogs/shared";
import { callUseCase, sendHttpResponse, validateSchema } from "../../lib/response-lib";
import { pilotsUseCases } from "../../../config/useCasesChoice";

const usersRouter = Router();

export const pilotsController = (): Router => {
  // usersRouter.route(usersRoute).post(async (req, res) => {
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
  usersRouter.route(usersRoute).put(async (req, res) => {
    const resultBody = await validateSchema(pilotSchema, req.body);
    return sendHttpResponse(
      res,
      await callUseCase({
        useCase: await pilotsUseCases.update,
        eitherAsyncParams: resultBody.map(body => ({
          ...body,
          pilotUuid: req.currentUserUuid,
        })),
      }),
    );
  });

  return usersRouter;
};
