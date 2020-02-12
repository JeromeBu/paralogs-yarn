import { Router } from "express";
import { loginController } from "../../controllers/loginController";
import { sendBodyMissingError, sendControllerResponse } from "../../../lib/response-lib";
import { signUpController } from "../../controllers/signUpController";

export const authRouter = Router();

export const loginRoute = "/users/login";
export const signUpRoute = "/users/signup";

authRouter.post(loginRoute, async (req, res) => {
  if (!req.body) return sendBodyMissingError({ res, expected: "Login params" });
  return sendControllerResponse(res, await loginController(req.body));
});

authRouter.post(signUpRoute, async (req, res) => {
  if (!req.body) return sendBodyMissingError({ res, expected: "SignUp params" });
  return sendControllerResponse(res, await signUpController(req.body));
});
