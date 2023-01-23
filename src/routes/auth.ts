import { Router } from "express";
import AuthController from "../controllers/AuthController";
import { JWTMiddlewares } from "../middlewares/JWTMiddleware";

const router = Router();
router.post("/login", AuthController.login);
router.post(
  "/change-password",
  [JWTMiddlewares],
  AuthController.changePassword
);
router.post("/logout", [JWTMiddlewares], AuthController.logout);
router.get("/validate-token", [], AuthController.validateToken);
router.post("/refresh-token", [], AuthController.refreshToken);
export default router;
