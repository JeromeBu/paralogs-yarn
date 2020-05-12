import { Response, NextFunction, Request } from "express";
import jwt from "jsonwebtoken";
import { loginRoute, PilotUuid, signUpRoute, WithUserUuid } from "@paralogs/shared";
import { ENV } from "../../../config/env";

const whiteListedRoutes = [loginRoute, signUpRoute];

export const authenticateMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (whiteListedRoutes.includes(req.path)) return next();
  const token = getTokenFromHeaders(req);
  if (!token) return res.status(401).json({ message: "You need to authenticate first" });
  try {
    const { userUuid } = jwt.verify(token, ENV.jwtSecret) as WithUserUuid;
    if (!userUuid) return sendForbiddenError(res);
    req.currentUserUuid = userUuid as PilotUuid;
    return next();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log({ error });
    return sendUnknownError(res, error.message);
  }
};

const sendForbiddenError = (res: Response) => {
  res.status(403);
  return res.json({ message: "Provided token does not match a user or is expired" });
};

const sendUnknownError = (res: Response, errorMessage: string) => {
  res.status(500);
  return res.json({ message: errorMessage });
};

const getTokenFromHeaders = (req: Request) => req.headers.authorization?.slice(7);
