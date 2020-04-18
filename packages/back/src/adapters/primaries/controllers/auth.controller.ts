import { Router } from "express";
import { loginSchema, signUpSchema } from "@paralogs/shared";
import {
  callUseCase,
  sendBodyMissingError,
  sendHttpResponse,
  success,
  validateSchema,
} from "../../lib/response-lib";
import { authUseCases } from "../../../config/useCasesChoice";
import { userMapper } from "../../../domain/mappers/user.mapper";

const authRouter = Router();

export const loginRoute = "/users/login";
export const signUpRoute = "/users/signup";
export const getMeRoute = "/users/getme";

export const getAuthRouter = (): Router => {
  authRouter.post(loginRoute, async (req, res) => {
    if (!req.body) return sendBodyMissingError({ res, expected: "Login params" });
    const resultParams = await validateSchema(loginSchema, req.body);
    const httpResponse = await callUseCase({ resultParams, useCase: authUseCases.login });
    return sendHttpResponse(res, httpResponse);
  });

  authRouter.post(signUpRoute, async (req, res) => {
    if (!req.body) return sendBodyMissingError({ res, expected: "SignUp params" });
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
