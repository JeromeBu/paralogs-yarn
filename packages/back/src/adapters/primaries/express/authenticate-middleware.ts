import { Response, NextFunction, Request } from "express";
import jwt from "jsonwebtoken";
import { UserId } from "@paralogs/shared";
import { config } from "../../../config";
import { UserRepo } from "../../../domain/port/UserRepo";

const whiteListedRoutes = ["/signup", "/login"];

export const authenticateMiddlewareBuilder = (userRepo: UserRepo) => async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (whiteListedRoutes.includes(req.path)) return next();
  const token = getTokenFromHeaders(req);
  if (!token) return res.status(401).send("You need to authenticate first");
  try {
    const { userId } = jwt.verify(token, config.jwtSecret) as { userId: UserId };
    const userEntity = await userRepo.findById(userId);
    if (!userEntity) return sendForbiddenError(res);
    req.currentUser = userEntity;
    return next();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log({ error });
    return sendForbiddenError(res);
  }
};

const sendForbiddenError = (res: Response) => {
  res.status(403);
  return res.send("Provided token does not match a user");
};

const getTokenFromHeaders = (req: Request) => req.headers.authorization?.slice(7);
