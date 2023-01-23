import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { AppDataSource } from "../../ormconfig";
import { UserSession } from "../entity/UserSession";

export const JWTMiddlewares = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.headers);
  let token = <string>req.headers["authorization"];
  token = token.split(" ")[1];
  let jwtPayload;
  try {
    jwtPayload = <any>jwt.verify(token, process.env.JWT_SECRET);
    res.locals.jwtPayload = jwtPayload;
    const { uuid } = jwtPayload.user;
    const userSessionRepository = AppDataSource.getRepository(UserSession);
    const userSession = await userSessionRepository.findOneOrFail({
      where: { uuid, active: true },
    });
    if (!userSession) {
      res.status(401).send();
      return;
    }
    if (new Date() > userSession.expiresAt) {
      res.status(401).send();
      return;
    }
  } catch (error) {
    res.status(401).send();
    return;
  }
  next();
};
