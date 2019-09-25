"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const imagenes_Ctrl_1 = __importDefault(require("../controllers/imagenes.Ctrl"));
exports.imagenesRouter = express_1.default.Router();
exports.imagenesRouter.route('/:tipo/:img').get(imagenes_Ctrl_1.default.obtener);
