"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const login_Ctrl_1 = __importDefault(require("../controllers/login.Ctrl"));
exports.loginRouter = express_1.default.Router();
exports.loginRouter.route('/').post(login_Ctrl_1.default.login);
