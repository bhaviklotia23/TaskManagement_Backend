import { AppDataSource } from "../../config/db";
import { Task, TaskPriority, TaskStatus } from "../../entities/task.entities";
import { User } from "../../entities/user.entities";
import { sendKafkaEvent } from "../../utils/kakfkaProducers";
import { TaskHistoryService } from "../task-history/taskHistory.service";

export class TaskService {
  private taskRepository = AppDataSource.getRepository(Task);
  private userRepository = AppDataSource.getRepository(User);
  private taskHistoryService = new TaskHistoryService();

  async getAllTasks(filters: {
    priority?: TaskPriority;
    status?: TaskStatus;
    page?: number;
    limit?: number;
  }) {
    const { priority, status, page = 1, limit = 10 } = filters;

    const query = this.taskRepository.createQueryBuilder("task");

    if (priority) {
      query.andWhere("task.priority = :priority", { priority });
    }
    if (status) {
      query.andWhere("task.status = :status", { status });
    }

    const offset = (page - 1) * limit;
    query.skip(offset).take(limit);

    // Fetch results with related entities
    const [tasks, total] = await query
      .leftJoinAndSelect("task.assignedTo", "assignedTo")
      .leftJoinAndSelect("task.createdBy", "createdBy")
      .getManyAndCount();

    return {
      tasks,
      total,
      page,
      limit,
    };
  }

  async getTaskById(id: number) {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: ["assignedTo", "createdBy"],
    });
    if (!task) {
      throw new Error("Task not found");
    }
    return task;
  }

  async createTask(
    title: string,
    description: string,
    priority: TaskPriority,
    status: TaskStatus,
    dueDate: Date,
    assignedToId: number,
    createdById: number
  ) {
    const assignedTo = await AppDataSource.getRepository(User).findOne({
      where: { id: assignedToId },
    });
    const createdBy = await AppDataSource.getRepository(User).findOne({
      where: { id: createdById },
    });

    if (!assignedTo || !createdBy) {
      throw new Error("Invalid user id");
    }

    const task = this.taskRepository.create({
      title,
      description,
      priority,
      status,
      dueDate,
      assignedTo,
      createdBy,
    });

    return await this.taskRepository.save(task);
  }

  async updateTask(id: number, updatedFields: Partial<Task>) {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: ["assignedTo", "createdBy"],
    });

    if (!task) {
      throw new Error("Task not found");
    }

    if (updatedFields.assignedToId) {
      const assignedTo = await this.userRepository.findOne({
        where: { id: updatedFields.assignedToId },
      });

      if (!assignedTo) {
        throw new Error("Assigned user not found");
      }

      updatedFields.assignedTo = assignedTo;
      delete updatedFields.assignedToId;
    }

    const changes = [];
    for (const key of Object.keys(updatedFields)) {
      if (task[key as keyof Task] !== updatedFields[key as keyof Task]) {
        changes.push({
          changeType: `${key}_change`,
          previousValue: task[key as keyof Task],
          newValue: updatedFields[key as keyof Task],
        });

        await this.taskHistoryService.logChange(
          id,
          `${key}_change`,
          { [key]: task[key as keyof Task] },
          { [key]: updatedFields[key as keyof Task] }
        );
      }
    }

    const kafkaMessages = changes.map(change =>
      sendKafkaEvent("task-updates", {
        taskId: id,
        changeType: change.changeType,
        previousValue: change.previousValue,
        newValue: change.newValue,
        timestamp: new Date(),
      })
    );
    await Promise.all(kafkaMessages);

    await this.taskRepository.update(id, updatedFields);

    return await this.taskRepository.findOne({
      where: { id },
      relations: ["assignedTo", "createdBy"],
    });
  }

  async deleteTask(id: number) {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new Error("Task not found");
    }

    await this.taskRepository.delete(id);
    return { message: "Task deleted successfully" };
  }
}
