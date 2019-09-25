"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const empleado_Ctrl_1 = __importDefault(require("../controllers/empleado.Ctrl"));
const autenticacion_1 = require("../middlewares/autenticacion");
exports.empleadoRouter = express_1.default.Router();
exports.empleadoRouter
    .route('/')
    .get([autenticacion_1.auth.verificaToken, autenticacion_1.auth.verificaAdminOEncargado], empleado_Ctrl_1.default.obtener)
    .post([autenticacion_1.auth.verificaToken, autenticacion_1.auth.verificaAdminOEncargado], empleado_Ctrl_1.default.crear);
exports.empleadoRouter
    .route('/:_id')
    .delete([autenticacion_1.auth.verificaToken, autenticacion_1.auth.verificaAdminOEncargado], empleado_Ctrl_1.default.borrar)
    .get([autenticacion_1.auth.verificaToken, autenticacion_1.auth.verificaAdminOEncargado], empleado_Ctrl_1.default.obtenerPorId)
    .put([autenticacion_1.auth.verificaToken, autenticacion_1.auth.verificaAdminOMismoUsuario], empleado_Ctrl_1.default.actualizar);
exports.empleadoRouter
    .route('/existe/:email')
    .get([autenticacion_1.auth.verificaToken, autenticacion_1.auth.verificaAdminOEncargado], empleado_Ctrl_1.default.obtenerPorEmail);
