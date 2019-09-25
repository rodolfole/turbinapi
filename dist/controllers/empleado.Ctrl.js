"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const empleado_Mdl_1 = __importDefault(require("../models/empleado.Mdl"));
let err, _id, email;
exports.default = {
    actualizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id } = req.params;
                const body = req.body;
                if (req.body._id) {
                    const emple = yield empleado_Mdl_1.default.findOne({
                        _id: body._id
                    });
                }
                const empleado = yield empleado_Mdl_1.default.findOneAndUpdate({
                    _id
                }, body, {
                    new: true
                });
                return res.json({
                    empleado,
                    ok: true
                });
            }
            catch (err) {
                res.status(500).json({
                    err,
                    ok: false
                });
            }
        });
    },
    borrar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id } = req.params;
                const cambiaEstado = {
                    estado: false
                };
                const empleado = yield empleado_Mdl_1.default.findOneAndUpdate({
                    _id
                }, cambiaEstado, {
                    new: true
                });
                if (!empleado) {
                    return res.status(404).json({
                        mensaje: `No se encontro al empleado con id: ${_id}`,
                        ok: false
                    });
                }
                return res.json({
                    empleado,
                    mensaje: `Empleado ${empleado.nombre} borrado`,
                    ok: true
                });
            }
            catch (err) {
                res.status(500).json({
                    err,
                    mensaje: `No se encontro al empleado con id: ${_id}`,
                    ok: false
                });
            }
        });
    },
    crear(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                const empleadoC = new empleado_Mdl_1.default({
                    nombre: body.nombre,
                    apellidoPat: body.apellidoPat,
                    apellidoMat: body.apellidoMat,
                    telefono: body.telefono,
                    direccion: body.direccion,
                    email: body.email,
                    password: bcryptjs_1.default.hashSync(body.password, 10),
                    empleado: req.empleado._id,
                    sucursal: body.sucursal,
                    role: body.role
                });
                const empleado = yield empleado_Mdl_1.default.create(empleadoC);
                return res.json({
                    empleado,
                    ok: true
                });
            }
            catch (err) {
                res.status(500).json({
                    err,
                    ok: false
                });
            }
        });
    },
    obtener(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { pagina = 1, porPagina = 10, filtro, campoOrdenar, tipoOrden, criterio = 'nombre', status } = req.query;
                const options = {
                    page: parseInt(pagina, 10),
                    limit: parseInt(porPagina, 10)
                };
                let filtroE = new RegExp(filtro, 'i');
                const consulta = {
                    $and: [
                        {
                            [criterio]: filtroE
                        },
                        {
                            estado: status
                        }
                    ]
                };
                if (campoOrdenar && tipoOrden) {
                    options.sort = {
                        [campoOrdenar]: tipoOrden
                    };
                }
                const empleados = yield empleado_Mdl_1.default.paginate(consulta, options);
                return res.json({
                    empleados,
                    ok: true
                });
            }
            catch (err) {
                return res.status(500).json({
                    err,
                    ok: false
                });
            }
        });
    },
    obtenerPorId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id } = req.params;
                const empleado = yield empleado_Mdl_1.default.findOne({
                    _id
                });
                if (!empleado) {
                    return res.status(404).json({
                        mensaje: 'No se encontro la categoria',
                        ok: false
                    });
                }
                return res.json({
                    empleado,
                    ok: true
                });
            }
            catch (err) {
                res.status(500).json({
                    err,
                    mensaje: `No se encontro el empleado con id: ${_id}`,
                    ok: false
                });
            }
        });
    },
    obtenerPorEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.params;
                const empleado = yield empleado_Mdl_1.default.findOne({
                    email
                });
                if (!empleado) {
                    return res.status(404).json({
                        mensaje: 'No se encontro la categoria',
                        ok: false
                    });
                }
                return res.json({
                    existe: true,
                    empleado,
                    ok: true
                });
            }
            catch (err) {
                res.status(500).json({
                    err,
                    mensaje: `No se encontro el empleado con id: ${email}`,
                    ok: false
                });
            }
        });
    }
};
