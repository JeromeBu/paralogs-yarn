import { Router } from "express";
import { updateUserSchema, usersRoute } from "@paralogs/shared";
import { callUseCase, sendHttpResponse, validateSchema } from "../../lib/response-lib";
import { userUseCases } from "../../../config/useCasesChoice";

const usersRouter = Router();

export const pilotsController = (): Router => {
  usersRouter.route(usersRoute).put(async (req, res) => {
    const resultBody = await validateSchema(updateUserSchema, req.body);
    return sendHttpResponse(
      res,
      await callUseCase({
        resultParams: resultBody.map(body => ({ ...body, currentUser: req.currentUser })),
        useCase: await userUseCases.update,
      }),
    );
  });

  return usersRouter;
};
