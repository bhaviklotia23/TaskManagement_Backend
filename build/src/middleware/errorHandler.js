"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
var ApiError_1 = require("../utils/ApiError");
var errorHandler = function (err, req, res, next) {
    if (err instanceof ApiError_1.ApiError) {
        res.status(err.statusCode).json({
            success: err.success,
            message: err.message,
        });
        return;
    }
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: "Internal Server Error",
    });
};
exports.errorHandler = errorHandler;
