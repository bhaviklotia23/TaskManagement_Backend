"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
var typeorm_1 = require("typeorm");
var user_entities_1 = require("../entities/user.entities");
var task_entities_1 = require("../entities/task.entities");
var dotenv_1 = __importDefault(require("dotenv"));
var taskHistory_entities_1 = require("../entities/taskHistory.entities");
dotenv_1.default.config();
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [user_entities_1.User, task_entities_1.Task, taskHistory_entities_1.TaskHistory],
    synchronize: true,
});
exports.AppDataSource.initialize()
    .then(function () {
    console.log("Database connected!");
})
    .catch(function (error) { return console.log("Database connection error:", error); });
