"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const comanda_Ctrl_1 = __importDefault(require("../controllers/comanda.Ctrl"));
const autenticacion_1 = require("../middlewares/autenticacion");
const comanda_Ctrl_2 = __importDefault(require("../controllers/comanda.Ctrl"));
exports.comandaRouter = express_1.default.Router();
exports.comandaRouter
    .route('/')
    .get(autenticacion_1.auth.verificaToken, comanda_Ctrl_2.default.obtener)
    .post(autenticacion_1.auth.verificaToken, comanda_Ctrl_1.default.crear);
exports.comandaRouter
    .route('/despachar/:_id')
    .put(autenticacion_1.auth.verificaToken, comanda_Ctrl_2.default.despachar);
exports.comandaRouter
    .route('/:_id')
    .delete([autenticacion_1.auth.verificaToken, autenticacion_1.auth.verificaAdmin], comanda_Ctrl_2.default.borrar)
    .get(autenticacion_1.auth.verificaToken, comanda_Ctrl_2.default.obtenerPorId)
    .put([autenticacion_1.auth.verificaToken, autenticacion_1.auth.verificaAdmin], comanda_Ctrl_2.default.actualizarEstado);
exports.comandaRouter
    .route('/:_id/addP')
    .put([autenticacion_1.auth.verificaToken, autenticacion_1.auth.verificaAdmin], comanda_Ctrl_2.default.actualizar);
