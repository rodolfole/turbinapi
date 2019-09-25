"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const venta_Ctrl_1 = __importDefault(require("../controllers/venta.Ctrl"));
const autenticacion_1 = require("../middlewares/autenticacion");
exports.ventaRouter = express_1.default.Router();
exports.ventaRouter
    .route('/')
    .get(autenticacion_1.auth.verificaToken, venta_Ctrl_1.default.obtener)
    .post(autenticacion_1.auth.verificaToken, venta_Ctrl_1.default.crear);
exports.ventaRouter
    .route('/:_id')
    .delete(autenticacion_1.auth.verificaToken, venta_Ctrl_1.default.borrar)
    .get(autenticacion_1.auth.verificaToken, venta_Ctrl_1.default.obtenerPorId)
    .put(autenticacion_1.auth.verificaToken, venta_Ctrl_1.default.actualizar);
exports.ventaRouter
    .route('/:_id/descargar')
    .get(autenticacion_1.auth.verificaToken, venta_Ctrl_1.default.descargar);
