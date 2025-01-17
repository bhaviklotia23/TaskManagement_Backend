import express from "express";
import "reflect-metadata";
import dotenv from "dotenv";
import "./src/config/db";
import { errorHandler } from "./src/middleware/errorHandler";
import userRoutes from "./src/modules/user/user.routes";
import taskRoutes from "./src/modules/task/task.routes";
import cors from 'cors'

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/task", taskRoutes);

app.use(errorHandler);

export default app;