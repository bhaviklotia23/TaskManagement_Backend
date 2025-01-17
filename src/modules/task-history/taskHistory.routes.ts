import { Router } from "express";
import { TaskHistoryController } from "./taskHistory.controller";

const router = Router();
const taskHistoryController = new TaskHistoryController();

router.get("/:taskId", (req, res, next) =>
  taskHistoryController.getHistory(req, res, next)
);

export default router;
