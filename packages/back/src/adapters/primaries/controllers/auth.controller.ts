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
    const eitherAsyncParams = await validateSchema(loginSchema, req.body);
    const httpResponse = await callUseCase({
      eitherAsyncParams,
      useCase: authUseCases.login,
    });
    return sendHttpResponse(res, httpResponse);
  });

  authRouter.post(signUpRoute, async (req, res) => {
    const eitherAsyncParams = await validateSchema(signUpSchema, req.body);
    const httpResponse = await callUseCase({
      eitherAsyncParams,
      useCase: authUseCases.signUp,
    });
    return sendHttpResponse(res, httpResponse);
  });

  authRouter.get(getMeRoute, async (req, res) => {
    const { currentUser } = req;
    const { pilot, user } = userMapper.entityToDTO(currentUser);

    return sendHttpResponse(
      res,
      success({
        currentUser: user,
        pilotInformation: pilot,
        token: currentUser.getProps().authToken,
      }),
    );
  });

  return authRouter;
};
