"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const compra_Ctrl_1 = __importDefault(require("../controllers/compra.Ctrl"));
const autenticacion_1 = require("../middlewares/autenticacion");
exports.compraRouter = express_1.default.Router();
exports.compraRouter
    .route('/')
    .get([autenticacion_1.auth.verificaToken, autenticacion_1.auth.verificaAdmin], compra_Ctrl_1.default.obtener)
    .post([autenticacion_1.auth.verificaToken, autenticacion_1.auth.verificaAdmin], compra_Ctrl_1.default.crear);
exports.compraRouter
    .route('/:_id')
    .get([autenticacion_1.auth.verificaToken, autenticacion_1.auth.verificaAdmin], compra_Ctrl_1.default.obtenerPorId)
    .put([autenticacion_1.auth.verificaToken, autenticacion_1.auth.verificaAdminOEncargado], compra_Ctrl_1.default.actualizar)
    .delete([autenticacion_1.auth.verificaToken, autenticacion_1.auth.verificaAdmin], compra_Ctrl_1.default.borrar);
exports.compraRouter
    .route('/todos/i')
    .get([autenticacion_1.auth.verificaToken, autenticacion_1.auth.verificaAdmin], compra_Ctrl_1.default.obtenerTodos);
exports.compraRouter
    .route('/fecha/reporte')
    .get([autenticacion_1.auth.verificaToken, autenticacion_1.auth.verificaAdmin], compra_Ctrl_1.default.obtenerPorFecha);
