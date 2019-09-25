"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const producto_Ctrl_1 = __importDefault(require("../controllers/producto.Ctrl"));
const autenticacion_1 = require("../middlewares/autenticacion");
exports.productoRouter = express_1.default.Router();
exports.productoRouter
    .route('/')
    .get([autenticacion_1.auth.verificaToken, autenticacion_1.auth.verificaAdmin], producto_Ctrl_1.default.obtener)
    .post([autenticacion_1.auth.verificaToken, autenticacion_1.auth.verificaAdmin], producto_Ctrl_1.default.crear);
exports.productoRouter
    .route('/:_id')
    .get([autenticacion_1.auth.verificaToken, autenticacion_1.auth.verificaAdmin], producto_Ctrl_1.default.obtenerPorId)
    .put([autenticacion_1.auth.verificaToken, autenticacion_1.auth.verificaAdminOEncargado], producto_Ctrl_1.default.actualizar)
    .delete([autenticacion_1.auth.verificaToken, autenticacion_1.auth.verificaAdmin], producto_Ctrl_1.default.borrar);
exports.productoRouter
    .route('/todos/p')
    .get([autenticacion_1.auth.verificaToken, autenticacion_1.auth.verificaAdmin], producto_Ctrl_1.default.obtenerTodos);
exports.productoRouter
    .route('/categoria/:_id')
    .get([autenticacion_1.auth.verificaToken, autenticacion_1.auth.verificaAdmin], producto_Ctrl_1.default.obtenerPorCat);
