"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = exports.TaskStatus = exports.TaskPriority = void 0;
var typeorm_1 = require("typeorm");
var user_entities_1 = require("./user.entities");
var TaskPriority;
(function (TaskPriority) {
    TaskPriority["LOW"] = "Low";
    TaskPriority["MEDIUM"] = "Medium";
    TaskPriority["HIGH"] = "High";
})(TaskPriority || (exports.TaskPriority = TaskPriority = {}));
var TaskStatus;
(function (TaskStatus) {
    TaskStatus["TODO"] = "To Do";
    TaskStatus["IN_PROGRESS"] = "In Progress";
    TaskStatus["DONE"] = "Done";
})(TaskStatus || (exports.TaskStatus = TaskStatus = {}));
var Task = /** @class */ (function () {
    function Task() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Task.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Task.prototype, "title", void 0);
    __decorate([
        (0, typeorm_1.Column)("text"),
        __metadata("design:type", String)
    ], Task.prototype, "description", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "enum",
            enum: TaskPriority,
            default: TaskPriority.LOW,
        }),
        __metadata("design:type", String)
    ], Task.prototype, "priority", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "enum",
            enum: TaskStatus,
            default: TaskStatus.TODO,
        }),
        __metadata("design:type", String)
    ], Task.prototype, "status", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "timestamp" }),
        __metadata("design:type", Date)
    ], Task.prototype, "dueDate", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], Task.prototype, "assignedToId", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return user_entities_1.User; }, { onDelete: "CASCADE" }),
        (0, typeorm_1.JoinColumn)({ name: "assignedToId" }),
        __metadata("design:type", user_entities_1.User)
    ], Task.prototype, "assignedTo", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], Task.prototype, "createdById", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return user_entities_1.User; }, { nullable: false }),
        (0, typeorm_1.JoinColumn)({ name: "createdById" }),
        __metadata("design:type", user_entities_1.User)
    ], Task.prototype, "createdBy", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", Date)
    ], Task.prototype, "createdAt", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)(),
        __metadata("design:type", Date)
    ], Task.prototype, "updatedAt", void 0);
    Task = __decorate([
        (0, typeorm_1.Entity)()
    ], Task);
    return Task;
}());
exports.Task = Task;
