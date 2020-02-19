import { Router } from "express";
import { loginController } from "../../controllers/login.controller";
import { sendBodyMissingError, sendControllerResponse } from "../../../lib/response-lib";
import { signUpController } from "../../controllers/signUp.controller";
import { getMeController } from "../../controllers/getMe.controller";

export const authRouter = Router();

export const loginRoute = "/users/login";
export const signUpRoute = "/users/signup";
export const getMeRoute = "/users/getme";

authRouter.post(loginRoute, async (req, res) => {
  if (!req.body) return sendBodyMissingError({ res, expected: "Login params" });
  return sendControllerResponse(res, await loginController(req.body));
});

authRouter.post(signUpRoute, async (req, res) => {
  if (!req.body) return sendBodyMissingError({ res, expected: "SignUp params" });
  return sendControllerResponse(res, await signUpController(req.body));
});

authRouter.get(getMeRoute, async (req, res) => {
  return sendControllerResponse(res, await getMeController(req.currentUser));
});
