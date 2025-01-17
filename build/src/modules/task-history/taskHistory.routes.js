"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var taskHistory_controller_1 = require("./taskHistory.controller");
var router = (0, express_1.Router)();
var taskHistoryController = new taskHistory_controller_1.TaskHistoryController();
router.get("/:taskId", function (req, res, next) {
    return taskHistoryController.getHistory(req, res, next);
});
exports.default = router;
