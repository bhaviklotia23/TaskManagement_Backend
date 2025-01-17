"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
var jwt_1 = require("../utils/jwt");
var ApiError_1 = require("../utils/ApiError");
var authenticate = function (req, res, next) {
    var authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return next(new ApiError_1.ApiError("Unauthorized", 401));
    }
    var token = authHeader.split(" ")[1];
    var decoded = (0, jwt_1.verifyToken)(token);
    if (!decoded) {
        return next(new ApiError_1.ApiError("Invalid token", 401));
    }
    req.user = decoded;
    next();
};
exports.authenticate = authenticate;
