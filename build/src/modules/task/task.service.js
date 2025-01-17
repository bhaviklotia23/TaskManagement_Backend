"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
var db_1 = require("../../config/db");
var task_entities_1 = require("../../entities/task.entities");
var user_entities_1 = require("../../entities/user.entities");
var taskHistory_service_1 = require("../task-history/taskHistory.service");
var TaskService = /** @class */ (function () {
    function TaskService() {
        this.taskRepository = db_1.AppDataSource.getRepository(task_entities_1.Task);
        this.userRepository = db_1.AppDataSource.getRepository(user_entities_1.User);
        this.taskHistoryService = new taskHistory_service_1.TaskHistoryService();
    }
    TaskService.prototype.getAllTasks = function (filters) {
        return __awaiter(this, void 0, void 0, function () {
            var priority, status, _a, page, _b, limit, query, offset, _c, tasks, total;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        priority = filters.priority, status = filters.status, _a = filters.page, page = _a === void 0 ? 1 : _a, _b = filters.limit, limit = _b === void 0 ? 10 : _b;
                        query = this.taskRepository.createQueryBuilder("task");
                        if (priority) {
                            query.andWhere("task.priority = :priority", { priority: priority });
                        }
                        if (status) {
                            query.andWhere("task.status = :status", { status: status });
                        }
                        offset = (page - 1) * limit;
                        query.skip(offset).take(limit);
                        return [4 /*yield*/, query
                                .leftJoinAndSelect("task.assignedTo", "assignedTo")
                                .leftJoinAndSelect("task.createdBy", "createdBy")
                                .getManyAndCount()];
                    case 1:
                        _c = _d.sent(), tasks = _c[0], total = _c[1];
                        return [2 /*return*/, {
                                tasks: tasks,
                                total: total,
                                page: page,
                                limit: limit,
                            }];
                }
            });
        });
    };
    TaskService.prototype.getTaskById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var task;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.taskRepository.findOne({
                            where: { id: id },
                            relations: ["assignedTo", "createdBy"],
                        })];
                    case 1:
                        task = _a.sent();
                        if (!task) {
                            throw new Error("Task not found");
                        }
                        return [2 /*return*/, task];
                }
            });
        });
    };
    TaskService.prototype.createTask = function (title, description, priority, status, dueDate, assignedToId, createdById) {
        return __awaiter(this, void 0, void 0, function () {
            var assignedTo, createdBy, task;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.AppDataSource.getRepository(user_entities_1.User).findOne({
                            where: { id: assignedToId },
                        })];
                    case 1:
                        assignedTo = _a.sent();
                        return [4 /*yield*/, db_1.AppDataSource.getRepository(user_entities_1.User).findOne({
                                where: { id: createdById },
                            })];
                    case 2:
                        createdBy = _a.sent();
                        if (!assignedTo || !createdBy) {
                            throw new Error("Invalid user id");
                        }
                        task = this.taskRepository.create({
                            title: title,
                            description: description,
                            priority: priority,
                            status: status,
                            dueDate: dueDate,
                            assignedTo: assignedTo,
                            createdBy: createdBy,
                        });
                        return [4 /*yield*/, this.taskRepository.save(task)];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    TaskService.prototype.updateTask = function (id, updatedFields) {
        return __awaiter(this, void 0, void 0, function () {
            var task, assignedTo, _i, _a, key;
            var _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, this.taskRepository.findOne({
                            where: { id: id },
                            relations: ["assignedTo", "createdBy"], // Include relations
                        })];
                    case 1:
                        task = _d.sent();
                        if (!task) {
                            throw new Error("Task not found");
                        }
                        if (!updatedFields.assignedToId) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.userRepository.findOne({
                                where: { id: updatedFields.assignedToId },
                            })];
                    case 2:
                        assignedTo = _d.sent();
                        if (!assignedTo) {
                            throw new Error("Assigned user not found");
                        }
                        updatedFields.assignedTo = assignedTo;
                        delete updatedFields.assignedToId; // Remove the id field after processing
                        _d.label = 3;
                    case 3:
                        _i = 0, _a = Object.keys(updatedFields);
                        _d.label = 4;
                    case 4:
                        if (!(_i < _a.length)) return [3 /*break*/, 7];
                        key = _a[_i];
                        if (!(task[key] !== updatedFields[key])) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.taskHistoryService.logChange(id, "".concat(key, "_change"), (_b = {}, _b[key] = task[key], _b), (_c = {}, _c[key] = updatedFields[key], _c))];
                    case 5:
                        _d.sent();
                        _d.label = 6;
                    case 6:
                        _i++;
                        return [3 /*break*/, 4];
                    case 7: return [4 /*yield*/, this.taskRepository.update(id, updatedFields)];
                    case 8:
                        _d.sent();
                        return [4 /*yield*/, this.taskRepository.findOne({
                                where: { id: id },
                                relations: ["assignedTo", "createdBy"], // Return the updated task with relations
                            })];
                    case 9: return [2 /*return*/, _d.sent()];
                }
            });
        });
    };
    TaskService.prototype.deleteTask = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var task;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.taskRepository.findOne({ where: { id: id } })];
                    case 1:
                        task = _a.sent();
                        if (!task) {
                            throw new Error("Task not found");
                        }
                        return [4 /*yield*/, this.taskRepository.delete(id)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, { message: "Task deleted successfully" }];
                }
            });
        });
    };
    return TaskService;
}());
exports.TaskService = TaskService;
