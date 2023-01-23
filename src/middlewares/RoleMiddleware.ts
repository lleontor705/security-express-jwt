import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../../ormconfig";

import { User } from "../entity/User";

export const RoleMiddleware = (roles: Array<string>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const id = res.locals.jwtPayload.userId;
    console.log(res.locals.jwtPayload);
    const userRepository = AppDataSource.getRepository(User);
    let user: User;
    try {
      console.log(userRepository);
      user = await userRepository.findOneOrFail({ where: { id } });
      console.log(user);
    } catch (id) {
      res.status(401).send();
    }
    console.log(user);
    if (roles.indexOf(user.role) > -1) next();
    else res.status(401).send();
  };
};
