"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var JWT_SECRET = process.env.JWT_SECRET || "reuwhdgsjnvcxji";
var generateToken = function (payload) {
    return jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn: "1h" });
};
exports.generateToken = generateToken;
var verifyToken = function (token) {
    try {
        var decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        if (typeof decoded === "string") {
            return null;
        }
        return decoded;
    }
    catch (_a) {
        return null;
    }
};
exports.verifyToken = verifyToken;
