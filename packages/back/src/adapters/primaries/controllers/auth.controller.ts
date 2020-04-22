import { Router } from "express";
import {
  getMeRoute,
  loginRoute,
  loginSchema,
  signUpRoute,
  signUpSchema,
} from "@paralogs/shared";
import {
  callUseCase,
  sendHttpResponse,
  success,
  validateSchema,
} from "../../lib/response-lib";
import { authUseCases } from "../../../config/useCasesChoice";
import { userMapper } from "../../../domain/mappers/user.mapper";

const authRouter = Router();

export const authController = (): Router => {
  authRouter.post(loginRoute, async (req, res) => {
    const resultParams = await validateSchema(loginSchema, req.body);
    const httpResponse = await callUseCase({ resultParams, useCase: authUseCases.login });
    return sendHttpResponse(res, httpResponse);
  });

  authRouter.post(signUpRoute, async (req, res) => {
    const resultParams = await validateSchema(signUpSchema, req.body);
    const httpResponse = await callUseCase({
      resultParams,
      useCase: authUseCases.signUp,
    });
    return sendHttpResponse(res, httpResponse);
  });

  authRouter.get(getMeRoute, async (req, res) => {
    const { currentUser } = req;

    return sendHttpResponse(
      res,
      success({
        currentUser: userMapper.entityToDTO(currentUser),
        token: currentUser.getProps().authToken,
      }),
    );
  });

  return authRouter;
};
