import { Router } from "express";
import UserController from "../controllers/UserController";
import { JWTMiddlewares } from "../middlewares/JWTMiddleware";
import { RoleMiddleware } from "../middlewares/RoleMiddleware";

const router = Router();
router.get("/", [JWTMiddlewares, RoleMiddleware(["ADMIN"])], UserController.listAll);
router.get(
    "/:id([0-9]+)",
    [JWTMiddlewares, RoleMiddleware(["ADMIN"])],
    UserController.getOneById
);
router.post("/", [JWTMiddlewares, RoleMiddleware(["ADMIN"])], UserController.newUser);
router.patch(
    "/:id([0-9]+)",
    [JWTMiddlewares, RoleMiddleware(["ADMIN"])],
    UserController.editUser
);
router.delete(
    "/:id([0-9]+)",
    [JWTMiddlewares, RoleMiddleware(["ADMIN"])],
    UserController.deleteUser
);

export default router;