import { Request, Response, NextFunction } from "express";
import { TaskService } from "./task.service";
import { TaskPriority, TaskStatus } from "../../entities/task.entities";

const taskService = new TaskService();

export class TaskController {
  async getAllTasks(req: Request, res: Response, next: NextFunction) {
    try {
      const { priority, status, page, limit } = req.query;

      const tasks = await taskService.getAllTasks({
        priority: priority as TaskPriority,
        status: status as TaskStatus,
        page: Number(page) || 1,
        limit: Number(limit) || 10,
      });

      res.json({ success: true, tasks });
    } catch (error) {
      next(error);
    }
  }

  async getTaskById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const task = await taskService.getTaskById(Number(id));
      res.json({ success: true, task });
    } catch (error) {
      next(error);
    }
  }

  async createTask(req: Request, res: Response, next: NextFunction) {
    const createdById = req.user.id;
    try {
      const {
        title,
        description,
        priority = TaskPriority.LOW,
        status = TaskStatus.TODO,
        dueDate,
        assignedToId,
      } = req.body;

      const task = await taskService.createTask(
        title,
        description,
        priority,
        status,
        new Date(dueDate),
        assignedToId,
        createdById
      );

      res.status(201).json({ success: true, task });
    } catch (error) {
      next(error);
    }
  }

  async updateTask(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const updatedFields = req.body;

      if (updatedFields.assignee) {
        updatedFields.assignedToId = Number(updatedFields.assignee);
        delete updatedFields.assignee;
      }

      const updatedTask = await taskService.updateTask(
        Number(id),
        updatedFields
      );
      res.json({ success: true, updatedTask });
    } catch (error) {
      next(error);
    }
  }

  async deleteTask(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const result = await taskService.deleteTask(Number(id));
      res.json({ success: true, message: result.message });
    } catch (error) {
      next(error);
    }
  }
}
