import { loginRoute, signUpRoute, WithUserUuid } from "@paralogs/shared";
import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const whiteListedRoutes = [loginRoute, signUpRoute];

export const createAuthenticateMiddleware = (jwtSecret: string) => async (
  req: Request & { currentUserUuid: string },
  res: Response,
  next: NextFunction,
) => {
  if (whiteListedRoutes.includes(req.path)) return next();
  const token = getTokenFromHeaders(req);
  if (!token || token === "undefined")
    return res.status(401).json({ message: "You need to authenticate first" });
  try {
    const { userUuid } = jwt.verify(token, jwtSecret) as WithUserUuid;
    if (!userUuid) return sendForbiddenError(res);
    req.currentUserUuid = userUuid;
    return next();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log({ error });
    return sendUnknownError(res, error.message);
  }
};

const sendForbiddenError = (res: Response) => {
  res.status(403);
  return res.json({
    message: "Provided token does not match a user or is expired",
  });
};

const sendUnknownError = (res: Response, errorMessage: string) => {
  res.status(500);
  return res.json({ message: errorMessage });
};

const getTokenFromHeaders = (req: Request) =>
  req.headers.authorization?.slice(7);
