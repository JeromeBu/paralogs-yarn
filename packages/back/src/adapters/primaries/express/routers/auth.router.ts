import { Router } from "express";
import { loginController } from "../../controllers/loginController";
import { sendBodyMissingError, sendControllerResponse } from "../../../lib/response-lib";
import { signUpController } from "../../controllers/signUpController";

export const authRouter = Router();

authRouter.post("/login", async (req, res) => {
  if (!req.body) return sendBodyMissingError({ res, expected: "Login params" });
  return sendControllerResponse(res, await loginController(req.body));
});

authRouter.post("/signup", async (req, res) => {
  if (!req.body) return sendBodyMissingError({ res, expected: "SignUp params" });
  return sendControllerResponse(res, await signUpController(req.body));
});
