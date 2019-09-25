"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const factura_Ctrl_1 = __importDefault(require("../controllers/factura.Ctrl"));
const autenticacion_1 = require("../middlewares/autenticacion");
exports.facturaRouter = express_1.default.Router();
exports.facturaRouter
    .route('/')
    .get(autenticacion_1.auth.verificaToken, factura_Ctrl_1.default.obtener)
    .post(autenticacion_1.auth.verificaToken, factura_Ctrl_1.default.test);
exports.facturaRouter
    .route('/:_id')
    .delete(autenticacion_1.auth.verificaToken, factura_Ctrl_1.default.borrar)
    .get(autenticacion_1.auth.verificaToken, factura_Ctrl_1.default.obtenerPorId)
    .put(autenticacion_1.auth.verificaToken, factura_Ctrl_1.default.actualizar);
exports.facturaRouter
    .route('/:_id/descargar')
    .get(autenticacion_1.auth.verificaToken, factura_Ctrl_1.default.descargar);
