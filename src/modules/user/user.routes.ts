import { Router } from "express";
import { UserController } from "./user.controller";

const router = Router();
const userController = new UserController();

router.get("/", (req, res, next) => userController.getAllUsers(req, res, next));

router.post("/login", (req, res, next) => userController.login(req, res, next));

router.post("/signup", (req, res, next) => userController.createUser(req, res, next));

export default router;
