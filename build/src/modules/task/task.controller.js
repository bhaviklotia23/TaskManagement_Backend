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
exports.TaskController = void 0;
var task_service_1 = require("./task.service");
var task_entities_1 = require("../../entities/task.entities");
var taskService = new task_service_1.TaskService();
var TaskController = /** @class */ (function () {
    function TaskController() {
    }
    TaskController.prototype.getAllTasks = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, priority, status_1, page, limit, tasks, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.query, priority = _a.priority, status_1 = _a.status, page = _a.page, limit = _a.limit;
                        return [4 /*yield*/, taskService.getAllTasks({
                                priority: priority,
                                status: status_1,
                                page: Number(page) || 1,
                                limit: Number(limit) || 10,
                            })];
                    case 1:
                        tasks = _b.sent();
                        res.json({ success: true, tasks: tasks });
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _b.sent();
                        next(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TaskController.prototype.getTaskById = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id, task, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = req.params.id;
                        return [4 /*yield*/, taskService.getTaskById(Number(id))];
                    case 1:
                        task = _a.sent();
                        res.json({ success: true, task: task });
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        next(error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TaskController.prototype.createTask = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var createdById, _a, title, description, _b, priority, _c, status_2, dueDate, assignedToId, task, error_3;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        createdById = req.user.id;
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 3, , 4]);
                        _a = req.body, title = _a.title, description = _a.description, _b = _a.priority, priority = _b === void 0 ? task_entities_1.TaskPriority.LOW : _b, _c = _a.status, status_2 = _c === void 0 ? task_entities_1.TaskStatus.TODO : _c, dueDate = _a.dueDate, assignedToId = _a.assignedToId;
                        return [4 /*yield*/, taskService.createTask(title, description, priority, status_2, new Date(dueDate), assignedToId, createdById)];
                    case 2:
                        task = _d.sent();
                        res.status(201).json({ success: true, task: task });
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _d.sent();
                        next(error_3);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    TaskController.prototype.updateTask = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id, updatedFields, updatedTask, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = req.params.id;
                        updatedFields = req.body;
                        if (updatedFields.assignee) {
                            updatedFields.assignedToId = Number(updatedFields.assignee);
                            delete updatedFields.assignee;
                        }
                        return [4 /*yield*/, taskService.updateTask(Number(id), updatedFields)];
                    case 1:
                        updatedTask = _a.sent();
                        res.json({ success: true, updatedTask: updatedTask });
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _a.sent();
                        next(error_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TaskController.prototype.deleteTask = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id, result, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = req.params.id;
                        return [4 /*yield*/, taskService.deleteTask(Number(id))];
                    case 1:
                        result = _a.sent();
                        res.json({ success: true, message: result.message });
                        return [3 /*break*/, 3];
                    case 2:
                        error_5 = _a.sent();
                        next(error_5);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return TaskController;
}());
exports.TaskController = TaskController;
