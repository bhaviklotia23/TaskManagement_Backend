import { Request, Response, NextFunction } from "express";
import { TaskHistoryService } from "./taskHistory.service";

const taskHistoryService = new TaskHistoryService();

export class TaskHistoryController {
  async getHistory(req: Request, res: Response, next: NextFunction) {
    try {
      const { taskId } = req.params;
      const history = await taskHistoryService.getHistoryByTaskId(Number(taskId));
      res.json({ success: true, history });
    } catch (error) {
      next(error);
    }
  }
}
