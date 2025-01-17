import { AppDataSource } from "../../config/db";
import { TaskHistory } from "../../entities/taskHistory.entities";
import { Task } from "../../entities/task.entities";

export class TaskHistoryService {
  private historyRepository = AppDataSource.getRepository(TaskHistory);

  async logChange(
    taskId: number,
    changeType: string,
    previousValue: Record<string, any>,
    newValue: Record<string, any>
  ) {
    const task = await AppDataSource.getRepository(Task).findOne({
      where: { id: taskId },
    });

    if (!task) {
      throw new Error("Task not found for history logging");
    }

    const history = this.historyRepository.create({
      task,
      taskId,
      changeType,
      previousValue,
      newValue,
    });

    return await this.historyRepository.save(history);
  }

  async getHistoryByTaskId(taskId: number) {
    return await this.historyRepository.find({
      where: { taskId },
      order: { timestamp: "DESC" },
    });
  }
}
