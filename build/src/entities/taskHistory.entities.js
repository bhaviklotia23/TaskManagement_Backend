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
exports.TaskHistory = void 0;
var typeorm_1 = require("typeorm");
var task_entities_1 = require("./task.entities");
var TaskHistory = /** @class */ (function () {
    function TaskHistory() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], TaskHistory.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return task_entities_1.Task; }, { onDelete: "CASCADE" }),
        (0, typeorm_1.JoinColumn)({ name: "task_id" }),
        __metadata("design:type", task_entities_1.Task)
    ], TaskHistory.prototype, "task", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], TaskHistory.prototype, "taskId", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], TaskHistory.prototype, "changeType", void 0);
    __decorate([
        (0, typeorm_1.Column)("jsonb"),
        __metadata("design:type", Object)
    ], TaskHistory.prototype, "previousValue", void 0);
    __decorate([
        (0, typeorm_1.Column)("jsonb"),
        __metadata("design:type", Object)
    ], TaskHistory.prototype, "newValue", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", Date)
    ], TaskHistory.prototype, "timestamp", void 0);
    TaskHistory = __decorate([
        (0, typeorm_1.Entity)()
    ], TaskHistory);
    return TaskHistory;
}());
exports.TaskHistory = TaskHistory;
