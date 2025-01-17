import { Router } from "express";
import { TaskController } from "./task.controller";
import { authenticate } from "../../middleware/auth";

const router = Router();
const taskController = new TaskController();

router.use(authenticate);

router.get("/", (req, res, next) => taskController.getAllTasks(req, res, next));
router.post("/", (req, res, next) => taskController.createTask(req, res, next));
router.get("/:id", (req, res, next) => taskController.getTaskById(req, res, next));
router.put("/:id", (req, res, next) => taskController.updateTask(req, res, next));
router.delete("/:id", (req, res, next) => taskController.deleteTask(req, res, next));

export default router;
