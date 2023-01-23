import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import * as moment from "moment-timezone";
import { AppDataSource } from "../../ormconfig";
import { validate } from "class-validator";
import { User } from "../entity/User";
import { UserSession } from "../entity/UserSession";
import * as crypto from "crypto";
export default class AuthController {
  static login = async (req: Request, res: Response) => {
    let { username, password } = req.body;
    const uiid = crypto.randomUUID();
    if (!(username && password)) {
      res.status(400).send();
    }
    const userRepository = AppDataSource.getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail({ where: { username } });
    } catch (error) {
      res.status(401).send();
    }
    if (!user.checkIfUnencryptedPasswordIsValid(password)) {
      res.status(401).send();
      return;
    }
    const currendtDate = new Date();
    const payload = {
      user: { userId: user.id, username: user.username, uuid: uiid },
      iat: currendtDate.getTime(),
      exp: new Date(
        currendtDate.getTime() + Number(process.env.JW_EXPIRE_IN_MINUTE) * 60000
      ).getTime(),
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    const tokenPayload = <any>jwt.verify(token, process.env.JWT_SECRET);
    console.log(tokenPayload);
    const userSession = new UserSession();
    userSession.userId = user.id;
    userSession.uuid = uiid;
    userSession.token = token;
    userSession.createdAt = currendtDate;
    userSession.updatedAt = currendtDate;
    userSession.expiresAt = new Date(tokenPayload.exp);
    userSession.uuid_parent = null;
    userSession.active = true;
    const errors = await validate(userSession);
    console.log(errors);
    const userSessionRepository = AppDataSource.getRepository(UserSession);
    try {
      await userSessionRepository.save(userSession);
    } catch (e) {
      console.log(e);
      res.status(409).send("userSession not saved");
      return;
    }
    res.send({ token: token });
  };
  static changePassword = async (req: Request, res: Response) => {
    const id = res.locals.jwtPayload.userId;
    const { oldPassword, newPassword } = req.body;
    if (!(oldPassword && newPassword)) {
      res.status(400).send();
    }

    const userRepository = AppDataSource.getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail(id);
    } catch (id) {
      res.status(401).send();
    }

    if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
      res.status(401).send();
      return;
    }
    user.password = newPassword;
    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }
    user.hashPassword();
    userRepository.save(user);

    res.status(204).send();
  };
  static logout = async (req: Request, res: Response) => {
    let token = <string>req.headers["authorization"];
    token = token.split(" ")[1];
    const tokenPayload = <any>jwt.verify(token, process.env.JWT_SECRET);
    const { uuid } = tokenPayload.user;
    const userSessionRepository = AppDataSource.getRepository(UserSession);
    try {
      const userSession = await userSessionRepository.findOneOrFail({
        where: { uuid, active: true },
      });
      userSession.active = false;
      userSessionRepository.save(userSession);
    } catch (error) {
      res.status(401).send();
    }
    res.status(204).send();
  };
  static validateToken = async (req: Request, res: Response) => {
    let token = <string>req.headers["authorization"];
    token = token.split(" ")[1];
    try {
      const tokenPayload = <any>jwt.verify(token, process.env.JWT_SECRET);
      const { uuid } = tokenPayload.user;
      const userSessionRepository = AppDataSource.getRepository(UserSession);
      const userSession = await userSessionRepository.findOneOrFail({
        where: { uuid, active: true },
      });
      if (new Date() > new Date(userSession.expiresAt)) {
        userSession.active = false;
        userSessionRepository.save(userSession);
        res.status(401).send();
      }
      res.status(200).send();
    } catch (error) {
      res.status(401).send();
    }
  };
  static refreshToken = async (req: Request, res: Response) => {
    const uiid = crypto.randomUUID();
    let token = <string>req.headers["authorization"];
    let tokenPayload;
    token = token.split(" ")[1];
    try {
      tokenPayload = <any>jwt.verify(token, process.env.JWT_SECRET);
      const { uuid } = tokenPayload.user;
      const userSessionRepository = AppDataSource.getRepository(UserSession);
      const userSession = await userSessionRepository.findOneOrFail({
        where: { uuid, active: true },
      });

      userSession.active = false;
      userSessionRepository.save(userSession);
      const currendtDate = new Date();
      const payload = {
        user: {
          userId: userSession.userId,
          username: tokenPayload.user.username,
          uuid: uiid,
        },
        iat: currendtDate.getTime(),
        exp: new Date(
          currendtDate.getTime() +
            Number(process.env.JW_EXPIRE_IN_MINUTE) * 60000
        ).getTime(),
      };
      token = jwt.sign(payload, process.env.JWT_SECRET);
      tokenPayload = <any>jwt.verify(token, process.env.JWT_SECRET);
      userSession.token = token;
      userSession.updatedAt = currendtDate;
      userSession.expiresAt = new Date(tokenPayload.exp);
      userSession.active = true;
      userSession.uuid = uiid;
      userSession.uuid_parent = userSession.uuid;
      userSessionRepository.save(userSession);
      res.status(200).send({ token: token });
    } catch (error) {
      res.status(401).send();
    }
  };
}
