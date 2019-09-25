"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const categoria_Ctrl_1 = __importDefault(require("../controllers/categoria.Ctrl"));
const autenticacion_1 = require("../middlewares/autenticacion");
exports.categoriaRouter = express_1.default.Router();
exports.categoriaRouter
    .route('/')
    .get([autenticacion_1.auth.verificaToken, autenticacion_1.auth.verificaAdmin], categoria_Ctrl_1.default.obtener)
    .post([autenticacion_1.auth.verificaToken, autenticacion_1.auth.verificaAdmin], categoria_Ctrl_1.default.crear);
exports.categoriaRouter
    .route('/:_id')
    .get([autenticacion_1.auth.verificaToken, autenticacion_1.auth.verificaAdmin], categoria_Ctrl_1.default.obtenerPorId)
    .put([autenticacion_1.auth.verificaToken, autenticacion_1.auth.verificaAdmin], categoria_Ctrl_1.default.actualizar)
    .delete([autenticacion_1.auth.verificaToken, autenticacion_1.auth.verificaAdmin], categoria_Ctrl_1.default.borrar);
exports.categoriaRouter
    .route('/todos/ca')
    .get([autenticacion_1.auth.verificaToken, autenticacion_1.auth.verificaAdmin], categoria_Ctrl_1.default.obtenerTodos);
