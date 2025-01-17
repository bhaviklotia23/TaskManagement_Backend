"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_controller_1 = require("../controllers/user.controller");
var router = (0, express_1.Router)();
var userController = new user_controller_1.UserController();
router.get("/", function (req, res, next) { return userController.getAllUsers(req, res, next); });
router.post("/", function (req, res, next) { return userController.createUser(req, res, next); });
exports.default = router;
