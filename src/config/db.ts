import { DataSource } from "typeorm";
import { User } from "../entities/user.entities";
import { Task } from "../entities/task.entities";
import dotenv from "dotenv";
import { TaskHistory } from "../entities/taskHistory.entities";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Task, TaskHistory],
  synchronize: true,
});

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected!");
  })
  .catch((error) => console.log("Database connection error:", error));
